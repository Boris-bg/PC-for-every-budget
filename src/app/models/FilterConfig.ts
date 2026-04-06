export type FilterType =
  | 'chips-string'   // избор от текстови стойности (бранд, цвят, тип)
  | 'chips-number'   // избор от числови стойности (GB, MHz)
  | 'chips-boolean'  // единичен toggle (isKIT, isRGB, hasWifi)
  | 'price-range';   // двоен ценови слайдер

export interface FilterConfig {
  type: FilterType;
  label: string;        // "Обем", "Тип", "Производител"...
  field: string;        // ключ от обекта: 'memorySizeGB', 'brand', 'type'...
  options?: (string | number)[];  // за chips — ако е null, се генерира от данните
  suffix?: string;        // " GB", " MHz" — добавя се след стойността в chip-а
  hideFromSpecs?: boolean;  // скрива от specs в картата
}
