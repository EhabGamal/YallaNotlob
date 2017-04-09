import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {FriendsComponent} from "./friends/friends.component";
import {GroupsComponent} from "./groups/groups.component";
import {OrdersComponent} from "./orders/orders.component";
import {AddorderComponent} from "./addorder/addorder.component";
import {VieworderComponent} from "./vieworder/vieworder.component";

import {AuthGuard} from "./services/auth.guard";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'vieworder', component: VieworderComponent, canActivate: [AuthGuard] },
  { path: 'addorder', component: AddorderComponent, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
