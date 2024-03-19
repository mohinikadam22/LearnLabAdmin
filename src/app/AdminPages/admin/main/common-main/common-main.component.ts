import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseTypeComponent } from '../course-type/course-type.component';

@Component({
  selector: 'app-common-main',
  templateUrl: './common-main.component.html',
  styleUrls: ['./common-main.component.css']
})
export class CommonMainComponent {
  
  constructor(private  dialog : MatDialog){}
  sidebarOpen = false;
  isSidebarOpen = false;


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
//   openDialog(){
//     const firstDivContent = document.querySelector('div.container > div.row > div.col-md-6 > div.card.shadow > div.card-body > div:first-child').innerHTML;
//     const dialogRef = this.dialog.open(CourseTypeComponent, {
//       width: '300px', // Adjust the width as per your requirements
//       data: { content: firstDivContent }
//     });
//   }
// }
openDialog(){
    this.dialog.open(CourseTypeComponent)
  //   
}
}