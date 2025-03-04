import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LogInComponent} from '../log-in.component';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  userService = inject(UserService)

  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  onSubmit = () => {
    this.userService.loginRequest(this.loginForm.value)
  }
}
