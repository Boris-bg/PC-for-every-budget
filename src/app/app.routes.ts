import {RouterModule, Routes} from '@angular/router';
import {Contacts} from './contacts/contacts';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  // {
  //   path: "",
  //   component: TODO
  // },
  // {
  //   path: "products",
  //   component: TODO
  // },
  // {
  //   path: "discounts",
  //   component: TODO
  // },
  // {
  //   path: "about-us",
  //   component: TODO
  // },
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
