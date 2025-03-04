import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {

}
