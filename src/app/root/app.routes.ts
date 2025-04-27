import { Routes } from '@angular/router';
import {HomeComponent} from '../pages/home/home.component';
import {LogInComponent} from '../pages/log-in/log-in.component';
import {SignUpComponent} from '../pages/sign-up/sign-up.component';
import {GroupsComponent} from '../pages/groups/groups.component';
import {CreateGroupComponent} from '../pages/create-group/create-group.component';
import {EventsComponent} from '../pages/events/events.component';
import {AllResourcesPageComponent} from '../pages/all-resources-page/all-resources-page.component';
import {JoinGroupComponent} from '../pages/join-group/join-group.component';
import {GroupGlanceComponent} from '../pages/group-glance/group-glance.component';
import {MembersComponent} from '../pages/members/members.component';
import {KitchenComponent} from '../pages/kitchen/kitchen.component';


export const routes: Routes = [
  {path : '',component : HomeComponent},
  {path : 'login', component : LogInComponent},
  {path : 'signup',component : SignUpComponent},
  {path : 'groups', component : GroupsComponent},
  {path : 'groups/:groupId',component : GroupGlanceComponent},
  {path : 'create/group', component : CreateGroupComponent},
  {path : 'groups/:groupId/events', component : EventsComponent},
  {path : 'groups/:groupId/resources', component : AllResourcesPageComponent},
  {path : 'join/group', component : JoinGroupComponent},
  {path : 'groups/:groupId/members', component : MembersComponent},
  {path : 'groups/:groupId/kitchen', component : KitchenComponent}

];
