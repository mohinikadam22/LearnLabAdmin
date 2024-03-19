import { Component,Inject, OnInit } from '@angular/core';
import { VideoService } from 'src/app/Services/video.service';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {

courses : any;
name:string;

constructor(private courseType:VideoService) { 

}
  ngOnInit(): void {
    this.loadTypes()
  }

addVideoType(): void {
  this.courseType.addCourseType(this.name)
    .subscribe(
      response => {
        console.log(response); // Optional: Handle success response
        this.name = ''; // Clear the input field
        window.location.reload();
      },
      error => {
        console.log(error); // Optional: Handle error response
      }
    );
}

loadTypes(){
  this.courseType.getCourseTypes().subscribe((res)=>
  {
    this.courses = res;
  })
}
// openPopup() {
//   const contentDiv = document.getElementById('contentDiv').innerHTML;
//   const dialogRef = this.dialog.open(CourseTypeComponent, {
//     width: '300px', // Adjust the width as per your requirements
//     data: { content: contentDiv }
//   });
// }
}



