import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavigationComponent, SearchResultDialogComponent } from './navigation/navigation.component';
import { MatModule } from './shared/mat/mat.module';
import { CustomRoutingModule } from './shared/custom-routing/custom-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SignupComponent, MessageSentDialogComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductService } from './services/product.service';
import { HttpModule } from '@angular/http';
import { SingleProductComponent } from './single-product/single-product.component';
import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ProfileComponent } from './profile/profile.component';
import { CardService } from './services/card.service';
import { ProfileService } from './services/profile.service';
import { AddressService } from './services/address.service';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ErrorComponent,
    SignupComponent,
    MessageSentDialogComponent,
    SearchResultDialogComponent,
    LoginComponent,
    CartComponent,
    SingleProductComponent,
    AlertComponent,
    FooterComponent,
    AddAddressComponent,
    AddCardComponent,
    EditCardComponent,
    EditAddressComponent,
    ProfileComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatModule,
    CustomRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    AuthService,
    ProductService,
    AuthGuard,
    CardService,
    AddressService,
    ProfileService,
    CartService,
    WishlistService
  ],
  entryComponents: [
    MessageSentDialogComponent,
    SearchResultDialogComponent,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
