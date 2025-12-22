
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { CartComponent } from './components/cart.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { CheckoutComponent } from './components/checkout.component';
import { OrderSuccessComponent } from './components/order-success.component';
import { MyOrdersComponent } from './components/my-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderSuccessComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: '**', redirectTo: '' }
];
