import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ErrorComponent } from '../../error/error.component';
import { SignupComponent } from '../../signup/signup.component';
import { LoginComponent } from 'src/app/login/login.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { SingleProductComponent } from 'src/app/single-product/single-product.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddAddressComponent } from 'src/app/add-address/add-address.component';
import { AddCardComponent } from 'src/app/add-card/add-card.component';
import { EditCardComponent } from 'src/app/edit-card/edit-card.component';
import { EditAddressComponent } from 'src/app/edit-address/edit-address.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { WishlistComponent } from 'src/app/wishlist/wishlist.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { OrderComponent } from 'src/app/order/order.component';
import { NotificationComponent } from 'src/app/notification/notification.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:productId', component: SingleProductComponent },
  { path: 'addAddress', component: AddAddressComponent, canActivate: [AuthGuard]  },
  { path: 'addCard', component: AddCardComponent, canActivate: [AuthGuard]  },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]  },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard]  },
  { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard]  },
  { path: 'editAddress/:addressId', component: EditAddressComponent, canActivate: [AuthGuard]  },
  { path: 'editCard/:cardId', component: EditCardComponent, canActivate: [AuthGuard]  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class CustomRoutingModule {}
