import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService, Order } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  tab: 'orders' | 'password' | 'admin' = 'orders';

  // ── User orders ────────────────────────────────────
  orders: Order[] = [];
  ordersLoading = true;
  expandedOrderId: number | null = null;

  // ── Password ───────────────────────────────────────
  currentPassword = '';
  newPassword     = '';
  confirmPassword = '';
  passwordMsg     = '';
  passwordError   = '';
  passwordLoading = false;

  // ── Admin ──────────────────────────────────────────
  adminOrders:  any[] = [];
  adminUsers:   any[] = [];
  adminLoading  = false;
  adminTab:     'orders' | 'users' | 'products' = 'orders';
  expandedAdminOrderId: number | null = null;

  adminProducts:    any[]    = [];
  productsLoading   = false;
  productSearch     = '';
  editingProduct:   any | null = null;
  editForm: any = {};
  editCategory: string = '';

  showAddForm = false;
  addCategory = '';
  sockets: any[] = [];
  interfaces: any[] = [];
  addForm: any = {};
  addError = '';
  addLoading = false;

  pcCpus: any[] = [];
  pcCoolers: any[] = [];
  pcMotherboards: any[] = [];
  pcRams: any[] = [];
  pcRoms: any[] = [];
  pcGpus: any[] = [];
  pcPsus: any[] = [];
  pcOss: any[] = [];
  pcBoxes: any[] = [];
  pcAccessories: any[] = [];

  readonly CATEGORIES = [
    'CPU', 'GPU', 'RAM', 'ROM', 'Motherboard',
    'Cooler', 'PSU', 'Box', 'OS', 'Accessory', 'Peripheral',
    'Keyboard', 'Mouse', 'Monitor'
  ];
  readonly ORDER_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(
    public  auth:         AuthService,
    private orderService: OrderService,
    public  cart:         CartService,
    private router:       Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/auth']); return; }
    this.loadOrders();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // ── Orders ─────────────────────────────────────────
  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: orders => { this.orders = orders; this.ordersLoading = false; },
      error: err   => { console.error('Orders error:', err); this.ordersLoading = false; }
    });
  }

  toggleOrder(id: number): void {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }

  trackingSteps(status: string): { label: string; icon: string; done: boolean; active: boolean }[] {
    const steps = [
      { key: 'PENDING',    label: 'Получена',     icon: '📋' },
      { key: 'PROCESSING', label: 'Обработва се', icon: '⚙️' },
      { key: 'SHIPPED',    label: 'Изпратена',    icon: '🚚' },
      { key: 'DELIVERED',  label: 'Доставена',    icon: '✅' },
    ];
    const order = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentIdx = order.indexOf(status);
    return steps.map((s, i) => ({
      ...s,
      done:   i < currentIdx,
      active: i === currentIdx,
    }));
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      PENDING: 'Получена', PROCESSING: 'Обработва се',
      SHIPPED: 'Изпратена', DELIVERED: 'Доставена', CANCELLED: 'Отказана',
    };
    return map[s] ?? s;
  }

  statusClass(s: string): string {
    const map: Record<string, string> = {
      PENDING: 'status--pending', PROCESSING: 'status--processing',
      SHIPPED: 'status--shipped', DELIVERED: 'status--delivered',
      CANCELLED: 'status--cancelled',
    };
    return map[s] ?? '';
  }

  paymentLabel(p: string): string {
    return p === 'CASH_ON_DELIVERY' ? 'Наложен платеж' : 'Карта';
  }

  deliveryTypeLabel(t: string): string {
    return t === 'PICKUP' ? 'Взимане от магазина' : 'Доставка до адрес';
  }

  // ── Password ───────────────────────────────────────
  changePassword(): void {
    this.passwordMsg = this.passwordError = '';
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Новите пароли не съвпадат'; return;
    }
    this.passwordLoading = true;
    this.auth.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.passwordMsg     = 'Паролата е сменена успешно!';
        this.currentPassword = this.newPassword = this.confirmPassword = '';
        this.passwordLoading = false;
      },
      error: err => {
        this.passwordError   = err.error?.error ?? 'Грешка';
        this.passwordLoading = false;
      }
    });
  }

  // ── Admin ──────────────────────────────────────────
  onAdminTab(): void {
    if (this.adminOrders.length === 0) this.loadAdminOrders();
    if (this.adminUsers.length === 0) this.loadAdminUsers();
    if (this.adminProducts.length === 0) this.loadAdminProducts();

    this.adminService.getSockets().subscribe(s => this.sockets = s);
    this.adminService.getInterfaces().subscribe(i => this.interfaces = i);
    this.adminService.getCpus().subscribe(d => this.pcCpus = d);
    this.adminService.getCoolers().subscribe(d => this.pcCoolers = d);
    this.adminService.getMotherboards().subscribe(d => this.pcMotherboards = d);
    this.adminService.getRams().subscribe(d => this.pcRams = d);
    this.adminService.getRoms().subscribe(d => this.pcRoms = d);
    this.adminService.getGpus().subscribe(d => this.pcGpus = d);
    this.adminService.getPsus().subscribe(d => this.pcPsus = d);
    this.adminService.getOss().subscribe(d => this.pcOss = d);
    this.adminService.getBoxes().subscribe(d => this.pcBoxes = d);
    this.adminService.getAccessories().subscribe(d => this.pcAccessories = d);
  }

  loadAdminOrders(): void {
    this.adminLoading = true;
    this.adminService.getOrders().subscribe({
      next: o => { this.adminOrders = o; this.adminLoading = false; },
      error: () => { this.adminLoading = false; }
    });
  }

  loadAdminUsers(): void {
    this.adminService.getUsers().subscribe({
      next: u => this.adminUsers = u
    });
  }

  updateOrderStatus(orderId: number, status: string, selectEl: HTMLSelectElement): void {
    if (status === 'CANCELLED') {
      const confirmed = confirm(
        `Сигурни ли сте, че искате да откажете поръчка #${orderId}?\nТова действие ще върне наличността на продуктите и не може да бъде отменено.`
      );
      if (!confirmed) {
        const order = this.adminOrders.find(o => o.id === orderId);
        if (order) selectEl.value = order.status;
        return;
      }
    }

    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.loadAdminOrders(),
      error: err => {
        alert(err.error?.error ?? 'Грешка при промяна на статуса');
        this.loadAdminOrders();
      }
    });
  }

  deleteUser(id: number, username: string): void {
    if (!confirm(`Изтрий потребител "${username}"?`)) return;
    this.adminService.deleteUser(id).subscribe(() => this.loadAdminUsers());
  }

  changeRole(id: number, role: 'USER' | 'ADMIN'): void {
    this.adminService.changeRole(id, role).subscribe(() => this.loadAdminUsers());
  }

  toggleAdminOrder(id: number): void {
    this.expandedAdminOrderId = this.expandedAdminOrderId === id ? null : id;
  }

  loadAdminProducts(): void {
    this.productsLoading = true;
    this.adminService.getAllProducts().subscribe({
      next: p => {
        console.log('Products loaded:', p); // ← добави
        this.adminProducts = p;
        this.productsLoading = false;
      },
      error: (err) => {
        console.error('Products error:', err); // ← добави
        this.productsLoading = false;
      }
    });
  }

  get filteredProducts(): any[] {
    const q = this.productSearch.toLowerCase().trim();
    if (!q) return this.adminProducts;
    return this.adminProducts.filter(p =>
      p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q)
    );
  }

  startEdit(product: any): void {
    // Запази категорията от таблицата ПРЕДИ да заредиш пълния обект
    const productCategory = product.category; // идва от findAllBasicInfo native query

    this.adminService.getProductById(product.id).subscribe({
      next: full => {
        this.editingProduct = full;
        this.editCategory   = productCategory;
        this.populateEditForm(full);
      },
      error: () => {
        this.editingProduct = product;
        this.editCategory   = productCategory;
        this.populateEditForm(product);
      }
    });
  }

  private populateEditForm(p: any): void {
    this.editForm = {
      name: p.name ?? '',
      price: p.price ?? 0,
      brand: p.brand ?? '',
      availability: p.availability ?? 0,
      additionalDetails: p.additionalDetails ?? '',
      imageUrl: p.imageUrl ?? '',
      warrantyPeriod: p.warrantyPeriod ?? 0,
      // CPU
      socketId: p.socket?.id ?? null,
      model: p.model ?? '',
      frequencyGHz: p.frequencyGHz ?? 0,
      cores: p.cores ?? 0,
      threads: p.threads ?? 0,
      tdpWatts: p.tdpWatts ?? 0,
      integratedGraphicsModel: p.integratedGraphicsModel ?? '',
      // GPU
      chipBrand: p.chipBrand ?? '',
      graphicsProcessor: p.graphicsProcessor ?? '',
      interfaceTypeId: p.interfaceType?.id ?? null,
      memorySizeGB: p.memorySizeGB ?? 0,
      memoryType: p.memoryType ?? '',
      slotWidth: p.slotWidth ?? 0,
      directXVersion: p.directXVersion ?? '',
      // RAM
      type: p.type ?? '',
      speedMHz: p.speedMHz ?? 0,
      isKIT: p.isKIT ?? false,
      isRGB: p.isRGB ?? false,
      // ROM
      storageType: p.storageType ?? '',
      formFactor: p.formFactor ?? '',
      // Motherboard
      chipset: p.chipset ?? '',
      supportedRamType: p.supportedRamType ?? '',
      ramSlots: p.ramSlots ?? 0,
      hasBuiltInWifi: p.hasBuiltInWifi ?? false,
      hasBuiltInBluetooth: p.hasBuiltInBluetooth ?? false,
      ports: p.ports ?? '',
      // Cooler
      coolingType: p.coolingType ?? '',
      fanWidthMM: p.fanWidthMM ?? 0,
      // PSU
      powerWatts: p.powerWatts ?? 0,
      efficiency: p.efficiency ?? '',
      category: p.category ?? '',
      hasPfc: p.hasPfc ?? false,
      wiringType: p.wiringType ?? '',
      // Box
      motherboardFormFactor: p.motherboardFormFactor ?? '',
      boxFormFactor: p.boxFormFactor ?? '',
      color: p.color ?? '',
      maxGPULengthMM: p.maxGPULengthMM ?? 0,
      maxCPUCoolerHeightMM: p.maxCPUCoolerHeightMM ?? 0,
      psuType: p.psuType ?? '',
      // OS
      osType: p.osType ?? '',
      // Accessory / Peripheral
      accessoryType: p.accessoryType ?? p.accessory_type ?? '',
      // Keyboard
      connectionType: p.connectionType ?? '',
      keyboardType: p.keyboardType ?? '',
      switches: p.switches ?? '',
      hasLighting: p.hasLighting ?? false,
      hasBulgarianLayout: p.hasBulgarianLayout ?? false,
      // Mouse
      maxDpi: p.maxDpi ?? 0,
      suitableForLeftHand: p.suitableForLeftHand ?? false,
      // Monitor
      panelSizeInch: p.panelSizeInch ?? 0,
      aspectRatio: p.aspectRatio ?? '',
      resolution: p.resolution ?? '',
      refreshRateHz: p.refreshRateHz ?? 0,
      responseTimeMs: p.responseTimeMs ?? 0,
      panelType: p.panelType ?? '',
      brightnessNits: p.brightnessNits ?? 0,
      // PC
      cpuId: p.cpu?.id ?? null,
      coolerId: p.cooler?.id ?? null,
      motherboardId: p.motherboard?.id ?? null,
      ramId: p.ram?.id ?? null,
      romId: p.rom?.id ?? null,
      rom2Id: p.rom2?.id ?? null,
      gpuId: p.gpu?.id ?? null,
      psuId: p.psu?.id ?? null,
      osId: p.os?.id ?? null,
      boxId: p.box?.id ?? null,
      accessory1Id: p.accessory1?.id ?? null,
      accessory2Id: p.accessory2?.id ?? null,
      comment: p.comment ?? '',
    };
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  saveProduct(): void {
    if (!this.editingProduct) return;

    let cat = this.editCategory;
    if (cat === 'PeripheralAccessory') cat = 'Peripheral';

    const payload = { ...this.editForm, category: cat };
    this.adminService.updateProduct(this.editingProduct.id, payload)
      .subscribe({
        next: () => {
          this.editingProduct = null;
          this.loadAdminProducts();
        },
        error: err => alert(err.error?.error ?? 'Грешка при запис')
      });
  }

  deleteProduct(id: number, name: string): void {
    if (!confirm(`Изтрий продукт "${name}"?`)) return;
    this.adminService.deleteProduct(id).subscribe(() => this.loadAdminProducts());
  }

  openAddForm(): void {
    this.showAddForm = true;
    this.addCategory = '';
    this.addForm     = { availability: 0, warrantyPeriod: 24 };
    this.addError    = '';
  }

  closeAddForm(): void {
    this.showAddForm = false;
  }

  submitNewProduct(): void {
    if (!this.addCategory) { this.addError = 'Избери категория'; return; }
    if (!this.addForm.name || !this.addForm.price) {
      this.addError = 'Попълни поне Ime и Цена'; return;
    }
    this.addLoading = true;
    this.adminService.createProduct({ ...this.addForm, category: this.addCategory })
      .subscribe({
        next: () => {
          this.addLoading  = false;
          this.showAddForm = false;
          this.loadAdminProducts();
        },
        error: err => {
          this.addError   = err.error?.error ?? 'Грешка при създаване';
          this.addLoading = false;
        }
      });
  }
}
