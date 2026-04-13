import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { CpuService }               from '../services/cpu.service';
import { GpuService }               from '../services/gpu.service';
import { RamService }               from '../services/ram.service';
import { RomService }               from '../services/rom.service';
import { MotherboardService }       from '../services/motherboard.service';
import { CoolerService }            from '../services/cooler.service';
import { PsuService }               from '../services/psu.service';
import { BoxService }               from '../services/box.service';
import { OsService }                from '../services/os.service';
import { MonitorService }           from '../services/monitor.service';
import { KeyboardService }          from '../services/keyboard.service';
import { MouseService }             from '../services/mouse.service';
import { AccessoryService }         from '../services/accessory.service';
import { PeripheralAccessoryService } from '../services/peripheral-accessory.service';
import { PcService }                from '../services/pc.service';
import { CartService }              from '../services/cart.service';
import { Product }                  from '../models/Product';

export interface ProductSection {
  title:  string;
  icon:   string;
  route:  string;
  items:  Product[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrl:    './products.css'
})
export class Products implements OnInit {

  sections: ProductSection[] = [];
  loading = true;

  constructor(
    private cpuSvc:        CpuService,
    private gpuSvc:        GpuService,
    private ramSvc:        RamService,
    private romSvc:        RomService,
    private mbSvc:         MotherboardService,
    private coolerSvc:     CoolerService,
    private psuSvc:        PsuService,
    private boxSvc:        BoxService,
    private osSvc:         OsService,
    private monitorSvc:    MonitorService,
    private keyboardSvc:   KeyboardService,
    private mouseSvc:      MouseService,
    private accessorySvc:  AccessoryService,
    private peripheralSvc: PeripheralAccessoryService,
    private pcSvc:         PcService,
    public  cart:          CartService,
  ) {}

  ngOnInit(): void {
    const top3 = (items: Product[]) =>
      [...items].sort((a, b) => b.rating - a.rating).slice(0, 3);

    forkJoin({
      cpus:        this.cpuSvc.getAll(),
      gpus:        this.gpuSvc.getAll(),
      rams:        this.ramSvc.getAll(),
      roms:        this.romSvc.getAll(),
      mbs:         this.mbSvc.getAll(),
      coolers:     this.coolerSvc.getAll(),
      psus:        this.psuSvc.getAll(),
      boxes:       this.boxSvc.getAll(),
      oss:         this.osSvc.getAll(),
      monitors:    this.monitorSvc.getAll(),
      keyboards:   this.keyboardSvc.getAll(),
      mice:        this.mouseSvc.getAll(),
      accessories: this.accessorySvc.getAll(),
      peripherals: this.peripheralSvc.getAll(),
      pcs:         this.pcSvc.getAll(),
    }).subscribe(data => {
      this.sections = [
        { title: 'Асемблирани конфигурации', icon: '🖥️',  route: '/products/assembled-pcs',         items: top3(data.pcs as Product[]) },
        { title: 'Процесори',                icon: '🔲',  route: '/products/cpu',                    items: top3(data.cpus as Product[]) },
        { title: 'Видеокарти',               icon: '🎮',  route: '/products/gpu',                    items: top3(data.gpus as Product[]) },
        { title: 'Оперативна памет',         icon: '🧠',  route: '/products/ram',                    items: top3(data.rams as Product[]) },
        { title: 'Постоянна памет',          icon: '💾',  route: '/products/rom',                    items: top3(data.roms as Product[]) },
        { title: 'Дънни платки',             icon: '🔌',  route: '/products/motherboard',            items: top3(data.mbs as Product[]) },
        { title: 'Охлаждане',                icon: '❄️',   route: '/products/cpu-coolers',            items: top3(data.coolers as Product[]) },
        { title: 'Захранвания',              icon: '⚡',  route: '/products/psu',                    items: top3(data.psus as Product[]) },
        { title: 'Кутии',                    icon: '📦',  route: '/products/boxes',                  items: top3(data.boxes as Product[]) },
        { title: 'Монитори',                 icon: '🖥️',  route: '/products/monitors',               items: top3(data.monitors as Product[]) },
        { title: 'Клавиатури',               icon: '⌨️',  route: '/products/keyboards',              items: top3(data.keyboards as Product[]) },
        { title: 'Мишки',                    icon: '🖱️',  route: '/products/mouses',                 items: top3(data.mice as Product[]) },
        { title: 'Аксесоари (PC)',           icon: '🔧',  route: '/products/accessories-parts',      items: top3(data.accessories as Product[]) },
        { title: 'Периферни аксесоари',      icon: '🎧',  route: '/products/accessories-peripherals',items: top3(data.peripherals as Product[]) },
        { title: 'Операционни системи',      icon: '🪟',  route: '/products/os',                     items: top3(data.oss as Product[]) },
      ];
      this.loading = false;
    });
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.cart.add(product, 1);
  }
}
