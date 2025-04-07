import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/root/app.config';
import { HomeComponent } from './app/pages/home/home.component';
import {RootComponent} from './app/root/root.component';

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
