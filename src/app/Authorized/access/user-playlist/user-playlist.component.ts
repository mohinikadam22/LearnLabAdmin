import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { VideoService } from 'src/app/Services/video.service';
import { WatchListService } from 'src/app/Services/watch-list.service';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.css']
})
export class UserPlaylistComponent {

  //video schema
  videos: any;
  watchlist: any
  courses: any
  subscribedCourses:any

  //userId
  userId: string;

  ngOnInit() {
    this.getId();
    this.getSubscribed();
  }

  constructor(private videoService: VideoService, private router: Router, private watchlistService: WatchListService, private authService: AuthService) { }

  // Get Video and play video

  
  getId() {
    this.userId = this.authService.getUser().UserID
  }
  getSubscribed(){
    this.videoService.getSubscribed(this.userId).subscribe((res)=>{
      this.subscribedCourses = res
    })
  }

}