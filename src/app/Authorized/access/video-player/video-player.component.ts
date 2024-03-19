import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})

export class VideoPlayerComponent implements OnInit, OnDestroy {
videos:any
courseId :any
  courseData:any
  userId: string;
  playlist:any[]
  constructor(private route: ActivatedRoute, private videoService:VideoService) {}
  ngOnDestroy(): void {
    // Store the current video URL in local storage
    localStorage.setItem('videoUrl', this.videoUrl);
  }

  
ngOnInit() {
  this.courseId = this.route.snapshot.paramMap.get('id');
  this.showPlaylist()
  this.videoUrl =`http://localhost:3000/video/${this.courseId}`
  const storedVideoUrl = localStorage.getItem('videoUrl');
  if (storedVideoUrl) {
    this.videoUrl = storedVideoUrl;
  }

  this.getCourses()

}

getCourses(){
  this.videoService.getCourseById(this.courseId).subscribe((res)=>{
  this.courseData = res 
  console.log(this.courseData);
  
  })
}

getVideoDetails(id: string) {
  this.videoService.getCourseVideosById(id).subscribe(video => {
    this.videos = video;
  });
}

showPlaylist(){
  this.videoService.getCourseVideosById(this.courseId).subscribe(res=>{
    this.playlist = res;
    console.log(this.playlist);
    if (this.playlist && this.playlist.length > 0) {
      // Play the first video initially if no stored video URL
      if (!this.videoUrl) {
        this.videoUrl = this.playlist[0].videoUrl;
      }
    }
  })
}

videoUrl:string
playVideo(video: any) {
  this.videoUrl = video.url;
}
getVideoUrl(): string {
  return this.videoUrl;
}

}

