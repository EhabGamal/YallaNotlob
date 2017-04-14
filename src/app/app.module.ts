//import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { APP_CONFIG, AppConfig } from './app.config';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { AddorderComponent } from './addorder/addorder.component';
import { VieworderComponent } from './vieworder/vieworder.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { GroupsComponent } from './groups/groups.component';
import { FriendsComponent } from './friends/friends.component';
import { LoadingComponent } from './parts/loading.component';
import { AuthGuard } from "./services/auth.guard";
import { LoginService } from "./services/login.service";
import { ModalComponent } from './parts/modal.component';
import { NotFoundComponent } from './parts/notfound.component';
import { SearchPipe } from './services/search.pipe';
import { UploaderComponent } from './parts/uploader.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProvidersComponent } from './providers/providers.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    AddorderComponent,
    VieworderComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    GroupsComponent,
    FriendsComponent,
    LoadingComponent,
    ModalComponent,
    NotFoundComponent,
    SearchPipe,
    UploaderComponent,
    NotificationsComponent,
    ProvidersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    //MaterialModule,
    MaterializeModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    LoginService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
