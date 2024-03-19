import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

interface VideoType {
  _id: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = 'http://localhost:3000/';
 

  constructor(private http: HttpClient) { }

  uploadVideo(videoData: File,thumbnailFile:File,filename:string,title:string,courseId:string) {
    const formData = new FormData();
    formData.append('video', videoData);
    formData.append('thumbnail', thumbnailFile)
    formData.append('title',title)
    formData.append('filename',filename)
    return this.http.post(`${this.apiUrl}videoadd/${courseId}`, formData);
  }

  uploadCourse(courseData:any){

    return this.http.post(`${this.apiUrl}uploadcourse`, courseData);
  }

  getCourseVideosById(courseId: string):Observable<any>{
    return this.http.get(`${this.apiUrl}getcoursevideos/${courseId}`);
  }

  getAllCourses(){
    return this.http.get(`${this.apiUrl}getallcourses`);
  }

  getCoursesByCategory(category:string):Observable<any>{
    return this.http.get( `${this.apiUrl}videosort/${category}`)
  }
  getCoursesWithCheckboxValue():Observable<any>{
    return this.http.get(`${this.apiUrl}videoscheck`);
  } 

  deleteCourse(courseId){
    return this.http.delete(`${this.apiUrl}deletecourse/${courseId}`)
  }

  updateCheckboxValue(videoId: string, checkboxValue: boolean) {
    const url = `${this.apiUrl}videoscheck/${videoId}`;
    return this.http.put(url, { checkboxValue });
  }
  
  
  getOnSearch(searchQuery: string) {
    const url = `${this.apiUrl}search?search=${searchQuery}`;
    return this.http.get<any[]>(url);
  }

  addCourseType(name: string): Observable<any> {
    const url = `${this.apiUrl}category`;
    const body = { name };

    return this.http.post(url, body);
  }

  getCourseTypes(): Observable<VideoType[]> {
    const url = `${this.apiUrl}category`;
    return this.http.get<VideoType[]>(url);
  }

  getSubscribed(userId:string){
  return this.http.get(`${this.apiUrl}users/${userId}/subscribedCourses`)
  }

  getData(){
    return this.http.get(`${this.apiUrl}getallcourses`)
      .pipe(
        map((response:[]) => response.map(item => item['courseName']))
      )
  }

  sendData(query:string){
    return this.http.post<{payload:string}>(`${this.apiUrl}searchcourse`,{payload:query},
    ).pipe(
      map(data => data.payload)
    );
  }

  getCourseById(id:string){
    return this.http.get(`${this.apiUrl}getCourses/${id}`)
  }


  deleteVideo(courseId:string,videoId:string){
    return this.http.delete(`${this.apiUrl}courses/${courseId}/videos/${videoId}`)
  }

}
