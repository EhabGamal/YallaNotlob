import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {FriendsComponent} from "./friends/friends.component";
import {GroupsComponent} from "./groups/groups.component";
import {OrdersComponent} from "./orders/orders.component";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'groups', component: GroupsComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
