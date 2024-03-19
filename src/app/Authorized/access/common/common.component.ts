import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { VideoService } from 'src/app/Services/video.service';
import { WatchListService } from 'src/app/Services/watch-list.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit, OnDestroy {
  sidebarOpen = false;
  courses: any;
  name: string;
  cart: any;
  number: any;
  subscription: Subscription;
  userId: string;
  cartlist: any;

  categories: any[];
  sortedData: any[];
  searchInput: string = '';
  category: string;
  videos: any[];
  watchlist: any;

  constructor(
    private dialogRef: MatDialog,
    private auth: AuthService,
    private courseType: VideoService,
    private cartlistService: CartService,
    private watchlistService: WatchListService
  ) {}

  ngOnInit(): void {
    this.loadTypes();
    this.getId();
    this.getCart();
    this.getWatchlist();
  }

  loadVideos() {
    this.courseType.getAllCourses().subscribe((res) => {
      this.courses = res
    })
  }
  
  loadTypes() {
    this.courseType.getCourseTypes().subscribe((res) => {
      this.categories = res;
    });
  }

  getId() {
    this.userId = this.auth.getUser().UserID;
  }

  getCart(): void {
    this.cartlistService.getCart(this.userId).subscribe({
      next: (cartList: any[]) => {
        this.cart = cartList;
      },
      error: (err) => {
        console.log("failed to get the cart", err);
      },
      complete: () => console.log("Got the cart")
    });
  }

  logout() {
    this.auth.logout();
  }

  getBySort(event: Event) {
    this.category = (event.target as HTMLSelectElement).value;
    // Use the selectedCategory value to filter videos
    if (this.category === '') {
      // Handle case when "All" category is selected
      this.loadVideos(); // Call the method to fetch all videos
    } else {
      // Handle other categories
    }
  }

  getWatchlist() {
    this.watchlistService.getWatchlist(this.userId).subscribe((res) => {
      this.watchlist = res;
    });
  }

  ngOnDestroy(): void {}

  searchCourses(): void {
    const searchQuery = this.searchInput || '';
    this.courseType.getOnSearch(searchQuery).subscribe(
      (res: any[]) => {
        this.sortedData = res;
      },
      (error) => {
        console.error(error);
        // Handle error if needed
      }
    );
  }

  courseNames;
  sendData(event: any) {
    let query: string = event.target.value;

    let matschSpaces: any = query.match(/\s*/);
    if (matschSpaces[0] === query) {
      this.courseNames = [];
      return;
    }
    this.courseType.sendData(query.trim()).subscribe((res) => {
      this.courseNames = res;
    });
  }
}
