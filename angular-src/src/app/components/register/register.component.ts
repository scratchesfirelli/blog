import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  passwordConfirm: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    }

    //Required fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Please use validate email', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    //Verify password
    if(!this.validateService.confirmPassword(user.password, user.passwordConfirm)){
      this.flashMessagesService.show('Please use validate email', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You are now registered', {cssClass: 'alert-success', timeout: 3000});  
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});  
        this.router.navigate(['/register']);
      }
    });
  }

  //Register user
  

}
