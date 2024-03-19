import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Authorized/access/home/home.component';
import { AddCoursesComponent } from './AdminPages/admin/main/add-courses/add-courses.component';


import { UserPlaylistComponent } from './Authorized/access/user-playlist/user-playlist.component';
import { VideoPlayerComponent } from './Authorized/access/video-player/video-player.component';
import { AccountComponent } from './Authorized/access/account/account.component';
import { CommonMainComponent } from './AdminPages/admin/main/common-main/common-main.component';
import { DashboardComponent } from './AdminPages/admin/main/dashboard/dashboard.component';
import { AdminAuthComponent } from './AdminPages/admin/admin-auth/admin-auth.component';
import { CourseTypeComponent } from './AdminPages/admin/main/course-type/course-type.component';
import { CoursesComponent } from './AdminPages/admin/main/courses/courses.component';
import { CartComponent } from './Authorized/access/cart/cart.component';
import { CommonComponent } from './Authorized/access/common/common.component';
import { SearchPipe } from './pipes/search.pipe';


// import { ViewDetailsComponent } from './AdminPages/admin/main/view-details/view-details.component';

//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CarouselModule  } from 'ngx-owl-carousel-o';



import { PaymentComponent } from './payment/payment.component';
import { SearchComponent } from './Authorized/access/search/search.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlaylistComponent } from './Authorized/access/playlist/playlist.component';
import { UploadVideosComponent } from './AdminPages/admin/main/upload-videos/upload-videos.component';
// import { ViewDetailsComponent } from './Authorized/access//view-details/view-details.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    NotFoundComponent,
    HomeComponent,
    UserPlaylistComponent,
    VideoPlayerComponent,
    AccountComponent,
    DashboardComponent,
    CommonMainComponent,
    AdminAuthComponent,
    CourseTypeComponent,
    CoursesComponent,
    AddCoursesComponent,
    CommonComponent,
    CartComponent,
    SearchPipe,
    PaymentComponent,
    SearchComponent,
    PlaylistComponent,
    UploadVideosComponent
    
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    //Mat
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatBadgeModule,
    MatTabsModule,
    NgApexchartsModule,
    MatFormFieldModule,
    CarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
