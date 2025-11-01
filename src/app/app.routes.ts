import {RouterModule, Routes} from '@angular/router';
import {Contacts} from './contacts/contacts';
import {NgModule} from '@angular/core';
import {AboutUs} from './about-us/about-us';
import {Home} from './home/home';
import {Products} from './products/products';
import {Discounts} from './discounts/discounts';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "products",
    component: Products
  },
  {
    path: "discounts",
    component: Discounts
  },
  {
    path: "about-us",
    component: AboutUs
  },
  {
    path: "contacts",
    component: Contacts
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
