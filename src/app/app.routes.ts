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
  {path: 'products/psu', loadComponent: () => import('./psu/psu.component').then(m => m.PsuComponent)},
  {path: 'products/gpu', loadComponent: () => import('./gpu/gpu.component').then(m => m.GpuComponent)},
  {path: 'products/rom', loadComponent: () => import('./rom/rom.component').then(m => m.RomComponent)},
  {path: 'products/accessories-parts', loadComponent: () => import('./accessory/accessory.component').then(m => m.AccessoryComponent)},
  {path: 'products/cpu-coolers', loadComponent: () => import('./cooler/cooler.component').then(m => m.CoolerComponent)},
  {path: 'products/motherboard', loadComponent: () => import('./motherboard/motherboard.component').then(m => m.MotherboardComponent) },
  {path: 'products/os', loadComponent: () => import('./os/os.component').then(m => m.OsComponent)},
  {path: 'products/keyboards', loadComponent: () => import('./keyboard/keyboard.component').then(m => m.KeyboardComponent) },
  {path: 'products/mouses', loadComponent: () => import('./mouse/mouse.component').then(m => m.MouseComponent) },
  {path: 'products/monitors', loadComponent: () => import('./monitor/monitor.component').then(m => m.MonitorComponent) },
  {path: 'products/audio', loadComponent: () => import('./audio/audio.component').then(m => m.AudioComponent) },
  {path: 'products/accessories-peripherals', loadComponent: () => import('./peripheral-accessories/peripheral-accessories.component').then(m => m.PeripheralAccessoriesComponent) },
];
