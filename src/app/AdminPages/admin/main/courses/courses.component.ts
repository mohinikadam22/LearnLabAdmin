import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/Services/video.service';
import { AddCoursesComponent } from '../add-courses/add-courses.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  videoDetails : any[];
  courses : any;
  filename:string;
  categories:any[];
  sortedData: any[];
  searchInput:string;
  category:string;

  video:any;
 


  constructor(private router:Router,private videoService:VideoService){}
  ngOnInit(): void {
    this.loadVideos()
   
  }


  onCheckboxChange(event:Event, course: any) {
    const target = event.target as HTMLInputElement;
  course.checkboxValue = target.checked; // event instance 

    this.videoService.updateCheckboxValue(course._id, course.checkboxValue)
      .subscribe(
        (res) => {
          console.log('Video checkbox value updated successfully.');
        },
      );
    console.log()
  }
      
  loadVideos(){
    this.videoService.getAllCourses().subscribe((res)=>{
        this.courses = res
    })

    this.videoService.getCourseTypes().subscribe((res)=>{
        this.categories = res
    })
  }
  getDetailById(videoDetails){
    this.router.navigate([`main/view-details`,videoDetails._id])

  }

  getBySort(event:Event){
     this.category = (event.target as HTMLSelectElement).value
                                                                  // Use the selectedCategory value to filter videos
  if (this.category === '') {
                                                                  // Handle case when "All" category is selected
    this.loadVideos();                                            // Call the method to fetch all videos
  } else {
    this.searchCourses()
  }
  }

  searchCourses() {
      const searchQuery = this.searchInput || '';                  // Get the search query from the input field
    this.videoService.getOnSearch(searchQuery).subscribe((res)=>
    {
      this.sortedData = res
    }
    )
}

}
