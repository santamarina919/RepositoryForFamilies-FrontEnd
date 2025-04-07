import { Component } from '@angular/core';
import {SignUpFormComponent} from '../../components/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    SignUpFormComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
