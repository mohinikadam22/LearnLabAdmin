import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-upload-videos',
  templateUrl: './upload-videos.component.html',
  styleUrls: ['./upload-videos.component.css']
})
export class UploadVideosComponent implements OnInit {

  courseId:string;
  videoForm: FormGroup;
  uploadedVideos: any[];



  constructor(private route: ActivatedRoute,private videoService: VideoService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.courseId = params.get('courseId');
    });
    
    this.videoForm = new FormGroup({
      video: new FormControl(null, Validators.required),
      thumbnail: new FormControl(null, Validators.required),
      filename: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required)
    });

    this.fetchUploadedVideos()
  }
  onSubmit() {
    const videoData = this.videoForm.get('video').value;
    const thumbnailFile = this.videoForm.get('thumbnail').value;
    const filename = this.videoForm.get('filename').value;
    const title = this.videoForm.get('title').value;

    this.videoService.uploadVideo(videoData, thumbnailFile, filename,title,this.courseId)
      .subscribe(
        response => {
          // Handle success response
          this.uploadedVideos.push(response);
          console.log('Video uploaded successfully', response);
        },
        error => {
          // Handle error response
          console.error('Error uploading video', error);
        }
      );
  }

  fetchUploadedVideos() {
    // Call the API or service method to fetch the list of uploaded videos
    // Example API call:
    this.videoService.getCourseVideosById(this.courseId).subscribe(
      (response: any[]) => {
        this.uploadedVideos = response;
      },
      error => {
        console.error('Error fetching uploaded videos', error);
      }
    );
  }

  deleteVideo(videoId: string) {
    // Call the API or service method to delete the video
    // Example API call:
    this.videoService.deleteVideo(this.courseId,videoId).subscribe(
      response => {
        // Handle success response
        this.uploadedVideos = this.uploadedVideos.filter(video => video._id !== videoId);
        console.log('Video deleted successfully', response);
        // Refresh the list of uploaded videos
        // this.fetchUploadedVideos();
      },
      error => {
        // Handle error response
        console.error('Error deleting video', error);
      }
    );
  }

  onVideoChange(event: any) {
    const file = event.target.files[0];
    this.videoForm.patchValue({ video: file });
  }

  onThumbnailChange(event: any) {
    const file = event.target.files[0];
    this.videoForm.patchValue({ thumbnail: file });
  }
}
