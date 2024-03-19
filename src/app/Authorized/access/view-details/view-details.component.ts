import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  
  video:any;
  videoDetails: any[];
  filename:any;
  courseName: any;
  courseDesc: any;
  courseCategory: any;
  courseLanguage: any;
  author: any;
  thumbnailUrl: any;
  amount: any;
  constructor(private activatedRoute:ActivatedRoute,private videoservice  : VideoService){}

  ngOnInit(): void {
    
  
    const id=this.activatedRoute.snapshot.paramMap.get('id');
      this.videoservice.getCourseVideosById(id).subscribe((res)=>{
        this.video =res
        console.log(res
          );
        this.filename = this.video.filename
        this.courseName = this.video.courseName
        this.courseDesc = this.video.courseDesc
        this.courseCategory = this.video.courseCategory
        this.courseLanguage = this.video.courseLanguage
        this.author = this.video.author
        this.thumbnailUrl = this.video.thumbnailUrl
        this.amount = this.video.amount
        this.author = this.video.author
    })
  }
  
}