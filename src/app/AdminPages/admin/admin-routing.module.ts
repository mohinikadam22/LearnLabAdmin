import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonMainComponent } from './main/common-main/common-main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { CourseTypeComponent } from './main/course-type/course-type.component';
import { CoursesComponent } from './main/courses/courses.component';
import { AddCoursesComponent } from './main/add-courses/add-courses.component';
import { UploadVideosComponent } from './main/upload-videos/upload-videos.component';

const routes: Routes = [
{path:'',component:CommonMainComponent,children:[
  {path:'dashboard',component:DashboardComponent},
  {path:'coursetype',component:CourseTypeComponent},
  {path:'courses',component:CoursesComponent},
  {path:'add-courses',component:AddCoursesComponent},
  {path:'upload-video/:courseId',component:UploadVideosComponent},
  {path:'',redirectTo:'/main/dashboard',pathMatch:'full'}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
