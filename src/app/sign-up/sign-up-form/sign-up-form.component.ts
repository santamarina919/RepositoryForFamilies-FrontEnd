import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {SignUpComponent} from '../sign-up.component';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {

  private userService = inject(UserService)

  signUpForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
    firstName : new FormControl(''),
    lastName : new FormControl('')
  })

  onSubmit = () => {
    this.userService.signUpRequest(this.signUpForm.value)
  }

}
