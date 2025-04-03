import { Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LogInComponent} from '../log-in/log-in.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {GroupsComponent} from '../groups/groups.component';
import {GroupGlanceComponent} from '../groups/group-glance/group-glance.component';
import {CreateGroupComponent} from '../pages/create-group/create-group.component';
import {JoinGroupComponent} from '../join-group/join-group.component';
import {EventsComponent} from '../events/events.component';
import {ResourcesComponent} from '../resources/resources.component';

export const routes: Routes = [
  {path : '',component : HomeComponent},
  {path : 'login', component : LogInComponent},
  {path : 'signup',component : SignUpComponent},
  {path : 'groups', component : GroupsComponent},
  {path : 'groups/:groupId',component : GroupGlanceComponent},
  {path : 'create/group', component : CreateGroupComponent},
  {path : 'groups/:groupId/events', component : EventsComponent},
  {path : 'groups/:groupId/resources', component : ResourcesComponent},
  {path : 'join/group', component : JoinGroupComponent},

];
