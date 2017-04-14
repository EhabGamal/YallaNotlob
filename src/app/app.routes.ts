import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {FriendsComponent} from "./friends/friends.component";
import {GroupsComponent} from "./groups/groups.component";
import {OrdersComponent} from "./orders/orders.component";
import {AddorderComponent} from "./addorder/addorder.component";
import {VieworderComponent} from "./vieworder/vieworder.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {NotFoundComponent} from "./parts/notfound.component";

import {AuthGuard} from "./services/auth.guard";

const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'vieworder/:id', component: VieworderComponent, canActivate: [AuthGuard] },
  { path: 'addorder', component: AddorderComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
