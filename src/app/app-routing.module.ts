import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
