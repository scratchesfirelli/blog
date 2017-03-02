import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/post/add-post.component';
import { PostDetailComponent } from './components/post/post-detail.component';
import { PostEditComponent } from './components/post/post-edit.component';
import { PostService} from './services/post.service';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';
import { UserService } from './services/user.service';
import { PaginationService } from './services/pagination.service';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', canActivate: [AuthGuard], children: [
    {path: '', component: ProfileComponent},
    {path: 'posts', component: ProfileComponent},
  ]},
  {path:'post', children: [
    {path: '', redirectTo: 'page/1', pathMatch: 'full'},
    {path: 'page/:pageNumber', component: PostComponent},
    {path: 'edit/:postId', component: PostEditComponent},
    {path: 'add', component: AddPostComponent, canActivate: [AuthGuard]},
    {path: ':postId', component: PostDetailComponent},
  ]},
  
  {path: 'user', children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: UserComponent},
    {path: ':username', component: UserDetailComponent},
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PostComponent,
    AddPostComponent,
    PostDetailComponent,
    UserComponent,
    UserDetailComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
    
  ],
  providers: [ValidateService, AuthService, AuthGuard, PostService, UserService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
