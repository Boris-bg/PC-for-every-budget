import {RouterModule, Routes} from '@angular/router';
import {Contacts} from './contacts/contacts';
import {NgModule} from '@angular/core';
import {AboutUs} from './about-us/about-us';
import {Home} from './home/home';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  // {
  //   path: "products",
  //   component: TODO
  // },
  // {
  //   path: "discounts",
  //   component: TODO
  // },
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
