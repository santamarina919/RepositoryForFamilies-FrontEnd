import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginFormComponent} from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-log-in',
  imports: [RouterOutlet, LoginFormComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

}
