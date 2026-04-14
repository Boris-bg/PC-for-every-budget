import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CpuService }                 from '../services/cpu.service';
import { GpuService }                 from '../services/gpu.service';
import { RamService }                 from '../services/ram.service';
import { RomService }                 from '../services/rom.service';
import { MotherboardService }         from '../services/motherboard.service';
import { CoolerService }              from '../services/cooler.service';
import { PsuService }                 from '../services/psu.service';
import { BoxService }                 from '../services/box.service';
import { OsService }                  from '../services/os.service';
import { MonitorService }             from '../services/monitor.service';
import { KeyboardService }            from '../services/keyboard.service';
import { MouseService }               from '../services/mouse.service';
import { AccessoryService }           from '../services/accessory.service';
import { PeripheralAccessoryService } from '../services/peripheral-accessory.service';
import { PcService }                  from '../services/pc.service';
import { CartService }                from '../services/cart.service';
import { Product }                    from '../models/Product';

export interface DiscountSection {
  title: string;
  icon:  string;
  route: string;
  items: Product[];
}

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './discounts.html',
  styleUrl:    './discounts.css'
})
export class Discounts implements OnInit {

  sections: DiscountSection[] = [];
  totalCount = 0;
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
    public  cart:          CartService
  ) {}

  ngOnInit(): void {
    const onDiscount = (items: Product[]) =>
      [...items]
        .filter(p => p.discountPrice != null && p.discountPrice > 0)
        .sort((a, b) => b.rating - a.rating);

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
      const raw: DiscountSection[] = [
        { title: 'Асемблирани конфигурации', icon: '🖥️', route: '/products/assembled-pcs',          items: onDiscount(data.pcs as Product[]) },
        { title: 'Процесори',                icon: '🔲', route: '/products/cpu',                     items: onDiscount(data.cpus as Product[]) },
        { title: 'Видеокарти',               icon: '🎮', route: '/products/gpu',                     items: onDiscount(data.gpus as Product[]) },
        { title: 'Оперативна памет',         icon: '🧠', route: '/products/ram',                     items: onDiscount(data.rams as Product[]) },
        { title: 'Постоянна памет',          icon: '💾', route: '/products/rom',                     items: onDiscount(data.roms as Product[]) },
        { title: 'Дънни платки',             icon: '🔌', route: '/products/motherboard',             items: onDiscount(data.mbs as Product[]) },
        { title: 'Охлаждане',                icon: '❄️',  route: '/products/cpu-coolers',             items: onDiscount(data.coolers as Product[]) },
        { title: 'Захранвания',              icon: '⚡', route: '/products/psu',                     items: onDiscount(data.psus as Product[]) },
        { title: 'Кутии',                    icon: '📦', route: '/products/boxes',                   items: onDiscount(data.boxes as Product[]) },
        { title: 'Монитори',                 icon: '🖥️', route: '/products/monitors',                items: onDiscount(data.monitors as Product[]) },
        { title: 'Клавиатури',               icon: '⌨️', route: '/products/keyboards',               items: onDiscount(data.keyboards as Product[]) },
        { title: 'Мишки',                    icon: '🖱️', route: '/products/mouses',                  items: onDiscount(data.mice as Product[]) },
        { title: 'Аксесоари (PC)',           icon: '🔧', route: '/products/accessories-parts',       items: onDiscount(data.accessories as Product[]) },
        { title: 'Периферни аксесоари',      icon: '🎧', route: '/products/accessories-peripherals', items: onDiscount(data.peripherals as Product[]) },
        { title: 'Операционни системи',      icon: '🪟', route: '/products/os',                      items: onDiscount(data.oss as Product[]) },
      ];

      // Показвай само категории с поне един продукт на промоция
      this.sections   = raw.filter(s => s.items.length > 0);
      this.totalCount = this.sections.reduce((sum, s) => sum + s.items.length, 0);
      this.loading    = false;
    });
  }

  discountPercent(product: Product): number {
    if (!product.discountPrice) return 0;
    return Math.round((1 - product.discountPrice / product.price) * 100);
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.cart.add(product, 1);
  }
}
