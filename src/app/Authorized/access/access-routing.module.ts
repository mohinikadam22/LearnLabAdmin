import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponent } from './common/common.component';
import { HomeComponent } from './home/home.component';
import { UserPlaylistComponent } from './user-playlist/user-playlist.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

const routes: Routes = [
  {path:'',component:CommonComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'view-details/:id',component:ViewDetailsComponent},
    {path:'playlist',component:UserPlaylistComponent},
    {path:'videoplayer/:id',component:VideoPlayerComponent},
    {path:'account',component:AccountComponent},
    {path:'cart',component:CartComponent},
    {path:'search',component:SearchComponent},
    {path:'',redirectTo:'/access/home',pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
