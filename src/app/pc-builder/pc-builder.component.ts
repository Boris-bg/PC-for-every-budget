import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CPU }         from '../models/CPU';
import { Cooler }      from '../models/Cooler';
import { Motherboard } from '../models/Motherboard';
import { RAM }         from '../models/RAM';
import { ROM }         from '../models/ROM';
import { GPU }         from '../models/GPU';
import { PSU }         from '../models/PSU';
import { Box }         from '../models/Box';
import { Product }     from '../models/Product';

import { CpuService }         from '../services/cpu.service';
import { CoolerService }      from '../services/cooler.service';
import { MotherboardService } from '../services/motherboard.service';
import { RamService }         from '../services/ram.service';
import { RomService }         from '../services/rom.service';
import { GpuService }         from '../services/gpu.service';
import { PsuService }         from '../services/psu.service';
import { BoxService }         from '../services/box.service';
import { CartService }        from '../services/cart.service';

export interface BuildSlot<T extends Product> {
  label:       string;
  icon:        string;
  required:    boolean;
  all:         T[];
  filtered:    T[];
  selected:    T | null;
  expanded:    boolean;
}

@Component({
  selector: 'app-pc-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pc-builder.component.html',
  styleUrl:    './pc-builder.component.css'
})
export class PcBuilderComponent implements OnInit {

  loading = true;

  // ── Slots ──────────────────────────────────────────
  cpu:         BuildSlot<CPU>         = this.slot('Процесор',        '🔲', true);
  cooler:      BuildSlot<Cooler>      = this.slot('Охлаждане',       '❄️',  true);
  motherboard: BuildSlot<Motherboard> = this.slot('Дънна платка',    '🖥️',  true);
  ram:         BuildSlot<RAM>         = this.slot('Оперативна памет','🧠', true);
  rom:         BuildSlot<ROM>         = this.slot('Диск',            '💾', true);
  rom2:        BuildSlot<ROM>         = this.slot('Втори диск',      '💾', false);
  gpu:         BuildSlot<GPU>         = this.slot('Видеокарта',      '🎮', false);
  psu:         BuildSlot<PSU>         = this.slot('Захранване',      '⚡', true);
  box:         BuildSlot<Box>         = this.slot('Кутия',           '📦', true);

  get slots(): BuildSlot<any>[] {
    return [this.cpu, this.cooler, this.motherboard, this.ram,
      this.rom, this.rom2, this.gpu, this.psu, this.box];
  }

  // ── Compatibility warnings ─────────────────────────
  warnings: string[] = [];

  constructor(
    private cpuSvc:    CpuService,
    private coolerSvc: CoolerService,
    private mbSvc:     MotherboardService,
    private ramSvc:    RamService,
    private romSvc:    RomService,
    private gpuSvc:    GpuService,
    private psuSvc:    PsuService,
    private boxSvc:    BoxService,
    private cart:      CartService,
    private router:    Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      cpus:         this.cpuSvc.getAll(),
      coolers:      this.coolerSvc.getAll(),
      motherboards: this.mbSvc.getAll(),
      rams:         this.ramSvc.getAll(),
      roms:         this.romSvc.getAll(),
      gpus:         this.gpuSvc.getAll(),
      psus:         this.psuSvc.getAll(),
      boxes:        this.boxSvc.getAll(),
    }).subscribe(data => {
      this.cpu.all         = data.cpus;
      this.cooler.all      = data.coolers;
      this.motherboard.all = data.motherboards;
      this.ram.all         = data.rams;
      this.rom.all         = data.roms;
      this.rom2.all        = data.roms;
      this.gpu.all         = data.gpus;
      this.psu.all         = data.psus;
      this.box.all         = data.boxes;
      this.applyAllFilters();
      this.loading = false;
    });
  }

  // ── Select a part ──────────────────────────────────
  select<T extends Product>(slot: BuildSlot<T>, part: T): void {
    slot.selected = part;
    slot.expanded = false;
    this.applyAllFilters();
    this.checkCompatibility();
  }

  deselect<T extends Product>(slot: BuildSlot<T>, event: Event): void {
    event.stopPropagation();
    slot.selected = null;
    this.applyAllFilters();
    this.checkCompatibility();
  }

  toggleSlot<T extends Product>(slot: BuildSlot<T>): void {
    slot.expanded = !slot.expanded;
  }

  // ── Filtering based on selections ─────────────────
  private applyAllFilters(): void {
    const selectedCpu = this.cpu.selected;
    const selectedMb  = this.motherboard.selected;

    // Cooler: same socket as CPU
    this.cooler.filtered = selectedCpu
      ? this.cooler.all.filter(c => c.socket?.name === selectedCpu.socket?.name)
      : this.cooler.all;

    // Motherboard: same socket as CPU
    this.motherboard.filtered = selectedCpu
      ? this.motherboard.all.filter(m => m.socket?.name === selectedCpu.socket?.name)
      : this.motherboard.all;

    // CPU: same socket as Motherboard (if MB selected first)
    this.cpu.filtered = selectedMb
      ? this.cpu.all.filter(c => c.socket?.name === selectedMb.socket?.name)
      : this.cpu.all;

    // RAM: compatible type with Motherboard
    this.ram.filtered = selectedMb
      ? this.ram.all.filter(r => r.type === selectedMb.supportedRamType)
      : this.ram.all;

    // ROM: all (no hard constraint)
    this.rom.filtered  = this.rom.all;
    this.rom2.filtered = this.rom.all.filter(r =>
      !this.rom.selected || r.id !== this.rom.selected.id
    );

    // GPU: all (optional)
    this.gpu.filtered = this.gpu.all;

    // PSU: filter by estimated power need
    const minPower = this.estimatePowerNeeds();
    this.psu.filtered = this.psu.all.filter(p => p.powerWatts >= minPower);

    // Box: compatible with motherboard form factor
    this.box.filtered = selectedMb
      ? this.box.all.filter(b => b.motherboardFormFactor === selectedMb.formFactor
        || this.isFormFactorCompatible(b.motherboardFormFactor, selectedMb.formFactor))
      : this.box.all;
  }

  // ATX box supports mATX and ITX too
  private isFormFactorCompatible(boxMbFF: string, mbFF: string): boolean {
    const hierarchy: Record<string, string[]> = {
      'ATX':  ['ATX', 'mATX', 'ITX'],
      'mATX': ['mATX', 'ITX'],
      'ITX':  ['ITX'],
    };
    return hierarchy[boxMbFF]?.includes(mbFF) ?? false;
  }

  private estimatePowerNeeds(): number {
    const cpuTdp = this.cpu.selected?.tdpWatts ?? 0;
    // Rough GPU power estimate by memory size
    const gpuPower = this.gpu.selected
      ? (this.gpu.selected.memorySizeGB >= 16 ? 300
        : this.gpu.selected.memorySizeGB >= 8  ? 200 : 120)
      : 0;
    return Math.ceil((cpuTdp + gpuPower) * 1.3); // 30% headroom
  }

  // ── Compatibility check ────────────────────────────
  checkCompatibility(): void {
    this.warnings = [];
    const { cpu, cooler, motherboard, ram, gpu, psu, box } = this;

    if (cpu.selected && motherboard.selected &&
      cpu.selected.socket?.name !== motherboard.selected.socket?.name) {
      this.warnings.push(
        `⚠️ Процесорът (${cpu.selected.socket?.name}) не е съвместим с дънната платка (${motherboard.selected.socket?.name})`
      );
    }

    if (cpu.selected && cooler.selected &&
      cpu.selected.socket?.name !== cooler.selected.socket?.name) {
      this.warnings.push(
        `⚠️ Охладителят (${cooler.selected.socket?.name}) не поддържа сокета на процесора (${cpu.selected.socket?.name})`
      );
    }

    if (motherboard.selected && ram.selected &&
      ram.selected.type !== motherboard.selected.supportedRamType) {
      this.warnings.push(
        `⚠️ RAM-ът (${ram.selected.type}) не е съвместим с дънната платка (${motherboard.selected.supportedRamType})`
      );
    }

    if (psu.selected) {
      const needed = this.estimatePowerNeeds();
      if (psu.selected.powerWatts < needed) {
        this.warnings.push(
          `⚠️ Захранването (${psu.selected.powerWatts}W) може да е недостатъчно (препоръчително: ${needed}W)`
        );
      }
    }

    if (motherboard.selected && box.selected) {
      if (!this.isFormFactorCompatible(
        box.selected.motherboardFormFactor,
        motherboard.selected.formFactor)) {
        this.warnings.push(
          `⚠️ Кутията не поддържа форм фактора на дънната платка (${motherboard.selected.formFactor})`
        );
      }
    }

    if (gpu.selected && box.selected) {
      // Rough GPU length estimate
      const gpuLength = gpu.selected.memorySizeGB >= 16 ? 340 : 300;
      if (gpuLength > box.selected.maxGPULengthMM) {
        this.warnings.push(
          `⚠️ Видеокартата може да не се побере в кутията (макс. ${box.selected.maxGPULengthMM}mm)`
        );
      }
    }

    if (this.gpuRequired && !gpu.selected) {
      this.warnings.push(
        '⚠️ Избраният процесор няма интегрирана графика — необходима е видеокарта'
      );
    }
  }

  get gpuRequired(): boolean {
    return this.cpu.selected !== null
      && !this.cpu.selected.integratedGraphicsModel;
  }

  // ── Price total ────────────────────────────────────
  get totalPrice(): number {
    return this.slots
      .filter(s => s.selected)
      .reduce((sum, s) => sum + (s.selected?.price ?? 0), 0);
  }

  get isComplete(): boolean {
    const requiredSlots = this.slots
      .filter(s => s.required)
      .every(s => s.selected !== null);

    const gpuOk = !this.gpuRequired || this.gpu.selected !== null;

    return requiredSlots && gpuOk;
  }

  get selectedCount(): number {
    return this.slots.filter(s => s.selected).length;
  }

  // ── Add all to cart ────────────────────────────────
  addAllToCart(): void {
    this.slots
      .filter(s => s.selected)
      .forEach(s => this.cart.add(s.selected!, 1));
    this.router.navigate(['/cart']);
  }

  // ── Reset ──────────────────────────────────────────
  reset(): void {
    this.slots.forEach(s => { s.selected = null; s.expanded = false; });
    this.applyAllFilters();
    this.checkCompatibility();
  }

  // ── Helper ────────────────────────────────────────
  private slot<T extends Product>(label: string, icon: string, required: boolean): BuildSlot<T> {
    return { label, icon, required, all: [], filtered: [], selected: null, expanded: false };
  }

  specSummary(slot: BuildSlot<any>): string {
    const p = slot.selected;
    if (!p) return '';
    if (slot === this.cpu as any)
      return `${p.cores} ядра · ${p.frequencyGHz} GHz · ${p.socket?.name}`;
    if (slot === this.cooler as any)
      return `${p.coolingType} · ${p.socket?.name}`;
    if (slot === this.motherboard as any)
      return `${p.socket?.name} · ${p.chipset} · ${p.supportedRamType}`;
    if (slot === this.ram as any)
      return `${p.memorySizeGB} GB · ${p.type} · ${p.speedMHz} MHz`;
    if (slot === this.rom as any || slot === this.rom2 as any)
      return `${p.memorySizeGB} GB · ${p.storageType} · ${p.formFactor}`;
    if (slot === this.gpu as any)
      return `${p.memorySizeGB} GB · ${p.memoryType}`;
    if (slot === this.psu as any)
      return `${p.powerWatts}W · ${p.efficiency}`;
    if (slot === this.box as any)
      return `${p.boxFormFactor} · ${p.color}`;
    return '';
  }
}
