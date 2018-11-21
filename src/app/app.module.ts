import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatModule } from './shared/mat/mat.module';
import { CustomRoutingModule } from './shared/custom-routing/custom-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SignupComponent, MessageSentDialogComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MailsService } from './services/mails.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ErrorComponent,
    SignupComponent,
    MessageSentDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatModule,
    CustomRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MailsService,
    AuthService
  ],
  entryComponents: [
    MessageSentDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
