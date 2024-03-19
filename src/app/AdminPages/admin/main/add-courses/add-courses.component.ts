import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  categories: any;
  // videos: any[];
  // videoDetails: any;
  // name: string;
  // selectedFile: File;
  // thumbnailFile: File;
  // filename: string;
  // category:string;
  // thumbnailUrl:string;
  // uploadErrorMessage = '';

  // uploading = false;
  // uploadSuccess = false;
  // uploadError = false;
  // videoSelected = false
  // thumbnailSelected = false
  // hide = false;
  // checkbox=false;
  courseForm: FormGroup;
  course:any
  courseId:any

  ngOnInit(): void {
    this.createCourseForm();
    this.loadTypes();
  }

  constructor(private courseService: VideoService,private router:Router,private formBuilder: FormBuilder) {}

  
  createCourseForm() {
    this.courseForm = this.formBuilder.group({
      filename: ['', Validators.required],
      courseName: ['', Validators.required],
      courseDesc: ['', Validators.required],
      courseCategory: ['', Validators.required],
      courseLanguage: ['', Validators.required],
      author: ['', Validators.required],
      amount: ['', Validators.required],
      thumbnail: [null, Validators.required] // Add thumbnail field with Validators.required
    });
  }

  onThumbnailChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.courseForm.patchValue({ thumbnail: file });
    this.courseForm.get('thumbnail').updateValueAndValidity();
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('thumbnail', this.courseForm.value.thumbnail);
    formData.append('filename', this.courseForm.value.filename);
    formData.append('courseName', this.courseForm.value.courseName)
    formData.append('courseDesc', this.courseForm.value.courseDesc)
    formData.append('courseCategory', this.courseForm.value.courseCategory)
    formData.append('courseLanguage', this.courseForm.value.courseLanguage)
    formData.append('author', this.courseForm.value.author)
    formData.append('amount', this.courseForm.value.amount)
    // Call your CourseService method to upload the course with the formData
    this.courseService.uploadCourse(formData).subscribe(
    (response: any)=>{
      console.log('Course Created Successfully:', response);
            this.course = response;    
             const courseId =this.course._id;
             this.router.navigate(['main/upload-video',courseId])
          },
          (error)=>console.error('failed to add course')
        );
  
    }

  //     next(response) {
  //       console.log('Course Created Successfully:', response);
  //       this.course = response;    
  //       this.courseId =this.course._id
  //     },
  //     error: (err) => console.error('Failed to add Course'),
  //     complete: () => {this.courseService.setCourseId(this.courseId); 
  //       this.router.navigate(['main/upload-courses'] ) ;
     
  //   }
  //   }
  //   );
  // }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }
  
  // onThumbnailFileSelected(event: any) {
  //   this.thumbnailFile = event.target.files[0];
  // }

  // uploadVideo() {
  //   this.uploading = true;
  //   this.videoService.uploadCourse(this.selectedFile,this.thumbnailFile,this.filename,this.category)
  //     .subscribe(
  //       (res:any) => {
  //         console.log(res);
  //         this.uploading = false;
  //       this.uploadSuccess = true;
  //       if(this.uploadSuccess=true){
  //         window.location.reload();
  //       }
  //       },
  //       (err: any) => {
  //         console.error(err);
  //         this.uploading = false;
  //         this.uploadError = true;
  //         this.uploadErrorMessage = err.message;
  //       }
  //     ); 

  // }
  loadTypes() {
    this.courseService.getCourseTypes().subscribe((res) => {
      this.categories = res;
      console.log(this.categories)
    })
  }

}
