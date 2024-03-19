import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { VideoService } from 'src/app/Services/video.service';


declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  carts: any            //video schema
  userId: string;     //userId
  totalamount         //store total amount
  data:any;
  length
  ngOnInit() {
    this.getId();
    this.getCart();
  }

  constructor(private videoService: VideoService,
    private cartlistService: CartService,
    private authService: AuthService,
    private paymentService:PaymentService,
    private http:HttpClient) { }



  getId() {
    this.userId = this.authService.getUser().UserID
  }

  calculateTotalamount(): void {
    this.totalamount = this.carts.reduce((total, course) => total + course.amount, 0);
  }

  getCart(): void {
    this.cartlistService.getCart(this.userId)
      .subscribe(
        {
          next: (cartList: any[]) => { this.carts = cartList;
            this.calculateTotalamount();
            length = this.carts.length
           },
          error(err) {
            console.log("failed to get the cart", err)
          },
          complete: () => console.log("Got the cart ")

        }
      );
  }



  removeFromCart(courseId: string): void {
    this.cartlistService.removeFromCart(this.userId, courseId)
      .subscribe
      (
        {
          next: () => this.getCart(),
          error: () => console.error("Error removing video from cart"),
          complete: () => console.log("Video Removed From Cart")
        }
      );
  }
  private apiUrl = 'http://localhost:3000/';
  courseId: string;
  handlePayment(amount: number,id) {
    const data = { amount: amount * 100 }; // Convert amount to smallest currency unit (paise)
    this.http.post(`${this.apiUrl}order/${id}/${this.userId}`, this.courseId).subscribe(
      (res: any) => {
        this.courseId = id
        this.handleOpenRazorpay(res.data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  handleOpenRazorpay(data: any) {
    const options = {
      key: 'rzp_test_UMoPc0VEKdqOOe', // Replace with your actual Razorpay Key ID
      amount: data.amount,
      currency: data.currency,
      name: 'Piyush',
      description: 'Test Transaction',
      order_id: data.id,
      handler: (response: any) => {
      // Extract the payment ID, order ID, and signature from the response object
      const razorpay_payment_id = response.razorpay_payment_id;
      const razorpay_order_id = response.razorpay_order_id;
      const razorpay_signature = response.razorpay_signature;
      console.log(razorpay_signature,razorpay_order_id,razorpay_payment_id)
      // Create the request body to send to the server
      const requestBody = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature 
      };
      this.verifyPayment(requestBody)
      console.log(requestBody,123)
      
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }

  verifyPayment(response: any) {

    this.http.post(`${this.apiUrl}verifypayment/${this.courseId}/${this.userId}`, response).subscribe(
      (res: any) => {
        this.removeFromCart(this.courseId)
        // Handle the verification response
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}