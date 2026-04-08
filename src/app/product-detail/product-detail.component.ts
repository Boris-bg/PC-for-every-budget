import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductDetailService} from '../services/product-detail.service';
import {Product} from '../models/Product';

interface SpecRow {
  label: string;
  value: string;
}

// Maps Java field names to Bulgarian labels
const FIELD_LABELS: Record<string, string> = {
  // Common
  brand: 'Производител',
  warrantyPeriod: 'Гаранция',
  availability: 'Наличност',
  additionalDetails: 'Допълнителна информация',
  // CPU
  'socket.name': 'Сокет',
  model: 'Модел',
  frequencyGHz: 'Честота',
  cores: 'Ядра',
  threads: 'Нишки',
  integratedGraphicsModel: 'Интегрирана графика',
  tdpWatts: 'TDP',
  // GPU
  chipBrand: 'Производител чип',
  graphicsProcessor: 'Графичен процесор',
  'interfaceType.name': 'Интерфейс',
  memorySizeGB: 'Памет',
  memoryType: 'Тип памет',
  slotWidth: 'Слотове',
  directXVersion: 'DirectX',
  // RAM
  speedMHz: 'Честота',
  type: 'Тип',
  isKIT: 'KIT',
  isRGB: 'RGB',
  // ROM
  storageType: 'Тип',
  formFactor: 'Форм фактор',
  // PSU
  powerWatts: 'Мощност',
  efficiency: 'Ефективност',
  category: 'Категория',
  hasPfc: 'PFC',
  wiringType: 'Кабели',
  // Box
  motherboardFormFactor: 'Форм фактор дънна платка',
  boxFormFactor: 'Форм фактор кутия',
  color: 'Цвят',
  maxGPULengthMM: 'Макс. дължина GPU',
  maxCPUCoolerHeightMM: 'Макс. височина охладител',
  psuType: 'Тип захранване',
  // Cooler
  coolingType: 'Тип охлаждане',
  fanWidthMM: 'Вентилатор',
  // Motherboard
  chipset: 'Чипсет',
  supportedRamType: 'Поддържан RAM',
  ramSlots: 'RAM слотове',
  hasBuiltInWifi: 'Wi-Fi',
  hasBuiltInBluetooth: 'Bluetooth',
  ports: 'Портове',
  // Monitor
  panelSizeInch: 'Размер',
  aspectRatio: 'Съотношение',
  resolution: 'Резолюция',
  refreshRateHz: 'Честота',
  responseTimeMs: 'Реакция',
  panelType: 'Тип панел',
  brightnessNits: 'Яркост',
  // Keyboard
  connectionType: 'Свързване',
  hasBulgarianLayout: 'BG подредба',
  keyboardType: 'Тип',
  switches: 'Суичове',
  hasLighting: 'Осветление',
  // Mouse
  maxDpi: 'Макс. DPI',
  suitableForLeftHand: 'За лява ръка',
  // OS
  osType: 'Тип',
  // Accessory
  accessoryType: 'Тип аксесоар',
  // PC
  comment: 'Коментар',
};

// Fields to skip in spec table
const SKIP_FIELDS = new Set([
  'id', 'name', 'price', 'rating', 'imageUrl', 'imageAltText',
  'cpu', 'cooler', 'motherboard', 'ram', 'rom', 'rom2',
  'gpu', 'psu', 'os', 'box', 'accessory1', 'accessory2',
  'interfaces', 'socket', 'interfaceType',
]);

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any = null;
  specs: SpecRow[] = [];
  quantity = 1;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductDetailService
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe({
      next: p => {
        this.product = p;
        this.specs = this.buildSpecs(p);
        this.loading = false;
      },
      error: () => {
        this.notFound = true;
        this.loading = false;
      }
    });
  }

  private buildSpecs(p: any): SpecRow[] {
    const rows: SpecRow[] = [];

    const addRow = (label: string, value: any, suffix = '') => {
      if (value === null || value === undefined || value === '') return;
      if (typeof value === 'boolean') {
        rows.push({label, value: value ? 'Да' : 'Не'});
      } else {
        rows.push({label, value: `${value}${suffix}`});
      }
    };

    // Iterate all fields
    for (const [key, val] of Object.entries(p)) {
      if (SKIP_FIELDS.has(key)) continue;
      const label = FIELD_LABELS[key];
      if (!label) continue;

      // Suffix hints
      const suffix =
        key === 'warrantyPeriod' ? ' месеца' :
          key === 'availability' ? ' бр.' :
            key === 'frequencyGHz' ? ' GHz' :
              key === 'cores' ? ' ядра' :
                key === 'threads' ? ' нишки' :
                  key === 'tdpWatts' ? ' W' :
                    key === 'memorySizeGB' ? ' GB' :
                      key === 'speedMHz' ? ' MHz' :
                        key === 'powerWatts' ? ' W' :
                          key === 'panelSizeInch' ? '"' :
                            key === 'refreshRateHz' ? ' Hz' :
                              key === 'responseTimeMs' ? ' ms' :
                                key === 'brightnessNits' ? ' nits' :
                                  key === 'maxDpi' ? ' DPI' :
                                    key === 'fanWidthMM' ? ' mm' :
                                      key === 'maxGPULengthMM' ? ' mm' :
                                        key === 'maxCPUCoolerHeightMM' ? ' mm' :
                                          key === 'slotWidth' ? ' слота' :
                                            key === 'ramSlots' ? ' бр.' : '';

      addRow(label, val, suffix);
    }

    // Nested: socket
    if (p.socket?.name) rows.unshift({label: 'Сокет', value: p.socket.name});
    // Nested: interfaceType
    if (p.interfaceType?.name) rows.push({label: 'Интерфейс', value: p.interfaceType.name});
    // Nested: interfaces (array)
    if (Array.isArray(p.interfaces) && p.interfaces.length) {
      rows.push({label: 'Интерфейси', value: p.interfaces.map((i: any) => i.name).join(', ')});
    }

    return rows;
  }

  changeQty(delta: number): void {
    const next = this.quantity + delta;
    if (next < 1 || next > (this.product?.availability ?? 1)) return;
    this.quantity = next;
  }

  goBack(): void {
    this.router.navigate(['..']);
  }
}
