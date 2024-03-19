import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Services/payment.service';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  videoId: string;
  userId: string;
  constructor(private paymentService: PaymentService,private auth:AuthService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = params['videoid'];
    });
  }


  username

  getId() {
    this.username = this.auth.getUser().UserID
    console.log(this.userId)
  }
  // }
  // options = {
  //   "key": "rzp_test_UMoPc0VEKdqOOe", // Enter the Key ID generated from the Dashboard
  //   "amount": "1000",
  //   "currency": "INR",
  //   "description": "Acme Corp",
  //   "prefill":
  //   {
  //     "email": "demo@example.com",
  //     "contact": +919900000000,
  //   },
  //   config: {
  //     display: {
  //       blocks: {
  //         utib: {                                                                           //name for Axis block
  //           name: "Pay using Axis Bank",
  //           instruments: [
  //             {
  //               method: "card",
  //               issuers: ["UTIB"]
  //             },
  //             {
  //               method: "netbanking",
  //               banks: ["UTIB"]
  //             },
  //           ]
  //         },
  //         other: { //  name for other block
  //           name: "Other Payment modes",
  //           instruments: [
  //             {
  //               method: "card",
  //               issuers: ["ICIC"]
  //             },
  //             {
  //               method: 'netbanking',
  //             }
  //           ]
  //         }
  //       },
  //       hide: [
  //         {
  //         method: "upi"
  //         }
  //       ],
  //       sequence: ["block.utib", "block.other"],
  //       preferences: {
  //         show_default_blocks: false // Should Checkout show its default blocks?
  //       }
  //     }
  //   },
  //   "handler": function (response) {
  //     alert(response.razorpay_payment_id);
  //   },
  //   "modal": {
  //     "ondismiss": function () {
  //       if (confirm("Are you sure, you want to close the form?")) {
        
  //         console.log("Checkout form closed by the user");
  //       } else {
    
  //         console.log("Complete the Payment")
  //       }
  //     }
  //   }
  // };
 
// rzp1
//   pay(){
//     this.rzp1 = new this.paymentService.nativeWindow.Razorpay(this.options);
//     this.rzp1.open()
//   }
makePayment() {
  this.paymentService.makePayment(this.videoId, this.userId).subscribe(
    response => {
      const { orderId, price, userId } = response;
      const options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: price * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Payment for Video',
        image: 'path/to/logo.png',
        order_id: orderId,
        prefill: {
          email: 'user@example.com',
          contact: '9876543210',
          name: 'John Doe'
        },
        handler: (response) => {
          // Handle the payment success
          console.log('Payment successful:', response);
          // You can redirect or show a success message to the user
        },
        modal: {
          ondismiss: () => {
            // Handle the payment failure or closure of the payment modal
            console.log('Payment failed or modal closed');
            // Show an error message to the user
          }
        }
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    },
    error => {
      // Handle the payment error here
      console.error('Payment failed:', error);
      // Show an error message to the user
    }
  );
}


}
