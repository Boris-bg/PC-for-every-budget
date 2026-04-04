import {Routes} from '@angular/router';
import {Home} from './home/home';  // ← само Home се импортира директно

export const routes: Routes = [
  // Начална страница — зарежда се веднага
  {
    path: '',
    component: Home
  },

  // Всичко останало — зарежда се само при навигация
  {path: 'products', loadComponent: () => import('./products/products').then(m => m.Products)},
  {path: 'discounts', loadComponent: () => import('./discounts/discounts').then(m => m.Discounts)},
  {path: 'about-us', loadComponent: () => import('./about-us/about-us').then(m => m.AboutUs)},
  {path: 'contacts', loadComponent: () => import('./contacts/contacts').then(m => m.Contacts)},
  {path: 'products/ram', loadComponent: () => import('./ram/ram.component').then(m => m.RamComponent)},
  {path: 'products/boxes', loadComponent: () => import('./box/box.component').then(m => m.BoxComponent)},
  {path: 'products/cpu', loadComponent: () => import('./cpu/cpu.component').then(m => m.CpuComponent)},
];
