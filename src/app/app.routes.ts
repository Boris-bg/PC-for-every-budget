import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { Discounts } from './discounts/discounts';
import { AboutUs } from './about-us/about-us';
import { Contacts } from './contacts/contacts';
import { RamComponent } from './ram/ram.component';
import { BoxComponent } from './box/box.component';

export const routes: Routes = [
  { path: '',                component: Home },
  { path: 'products',        component: Products },
  { path: 'discounts',       component: Discounts },
  { path: 'about-us',        component: AboutUs },
  { path: 'contacts',        component: Contacts },
  { path: 'products/ram',    component: RamComponent },
  { path: 'products/boxes',  component: BoxComponent },
];
