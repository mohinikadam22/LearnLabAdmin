import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { VideoService } from 'src/app/Services/video.service';
import { WatchListService } from 'src/app/Services/watch-list.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  courses: any;           //Video Schema
  userId: string;       //UserID
  watchlist: any;      //stores watchlist
  cartlist: any       //stores cartlist
  courseId


  constructor
    (private videoService: VideoService,
      private router: Router,
      private watchlistService: WatchListService,
      private authService: AuthService,
      private cartlistService: CartService,
     ) { }

  ngOnInit() {
    // this.loadVideos();
    this.getId();
    this.getWatchlist();   //loads method 
    this.watchlist        //loads object
    this.cartlist        //loads object
    this.getCart()      //loads method 
    this.CheckCourse();
  }

  // load all videos using this method

  loadVideos() {
    this.videoService.getAllCourses().subscribe(data => {
      // this.videos = data;
    });
  }
  CheckCourse(){
    this.videoService.getCoursesWithCheckboxValue().subscribe(data=>{
      this.courses=data;
    })
  }

  getId() {
    this.userId = this.authService.getUser().UserID
  }


  // CRUD operation on Watchlist

  getWatchlist() {
    this.watchlistService.getWatchlist(this.userId).subscribe((res) => {
      this.watchlist = res;
    });
  };

  // function to check if user already has course in his watchlist

  addOrRemoveFromWatchlist(courseId: string): void {
    const videoIndex = this.watchlist.findIndex((course: { _id: string; }) => course._id === courseId);

    if (videoIndex !== -1) {
      this.deleteCourseFromWatchlist(courseId);         // Video is already in the watchlist, remove it 
  }
    
    else {
      this.addCourseToWatchlist(courseId);              // Video is not in the watchlist, add it
    }
    location.reload();
  }


  // add course to watchlist
  addCourseToWatchlist(courseId: string): void {
    this.watchlistService.addVideoToWatchlist(this.userId, courseId)
      .subscribe(
        {
          next(response) {
            console.log('Video added to watchlist:');
          },
          error(err) {
            console.error('Error adding video to watchlist:', err);
          },
          complete: () => { this.getWatchlist();
          }
        }
      );
  }


  deleteCourseFromWatchlist(courseId: string): void {
    this.watchlistService.deleteVideoFromWatchlist(this.userId, courseId)
      .subscribe(
        {
          next(response) {
            console.log('Video removed from watchlist:');
          },
          error(err) {
            console.error('Error removing video from watchlist:', err);
          },
          complete: () => { this.getWatchlist();
           }
        }
      );
  }

// check if User has Already added course to Watchlist
  isCourseInWatchlist(courseId: string): boolean {
    return this.watchlist && this.watchlist.some((video: { _id: string; }) => video._id === courseId);
  }


  //  Cart Code here 


  // Code to get Courses from cart 

  getCart() {
    this.cartlistService.getCart(this.userId)
      .subscribe
      ((res) => {
        this.cartlist = res
        console.log('got the cart')
      }
      );
  }

  // function to check if user already has course in his cart

  addOrRemoveFromCartlist(courseId: string): void {
    const cartIndex = this.cartlist.findIndex((course: { _id: string; }) => course._id === courseId);
    if (cartIndex !== -1) {
      this.removeFromCart(courseId);    // Video is already in the cart, remove it
      alert('Video Removed from Cart')
    } else {
      this.addItemToCart(courseId);  // Video is not in the cart, add it
      alert('Video Added to Cart')
    }
 
  }

removeFromCart(courseId: string): void {
    this.cartlistService.removeFromCart(this.userId, courseId)
      .subscribe(
        {
          next(response) {
            console.log('Video removed from Cart');
          },
          error(err) { console.log("Error removing video from cart", err) },
          complete: () => { this.getCart(); },
        }
      );
  }

addItemToCart(courseId: string) {
    this.cartlistService.addToCart(this.userId, courseId)
      .subscribe
      ({
        next(response) {
          console.log('Video added to Cart');
        },
        error: () => console.error('Failed to add Item to Cart'),
        complete: () => { this.getCart(); }
      }
      );
  }

  // check if User has Already added course to cart
  isCartlist(courseId: string): boolean {
    return this.cartlist && this.cartlist.some((course: { _id: string; }) => course._id === courseId);
  }


}
