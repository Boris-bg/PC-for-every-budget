import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

export interface SearchResult {
  type: 'product' | 'category';
  label: string;
  sublabel?: string;
  route: string;
  state?: any;
}

@Injectable({ providedIn: 'root' })
export class SearchService {

  private readonly categories: SearchResult[] = [
    { type: 'category', label: 'Процесори',              sublabel: 'Категория', route: '/products/cpu' },
    { type: 'category', label: 'Видеокарти',             sublabel: 'Категория', route: '/products/gpu' },
    { type: 'category', label: 'Оперативна памет',       sublabel: 'Категория', route: '/products/ram' },
    { type: 'category', label: 'Дънни платки',           sublabel: 'Категория', route: '/products/motherboard' },
    { type: 'category', label: 'Постоянна памет',        sublabel: 'Категория', route: '/products/rom' },
    { type: 'category', label: 'Захранвания',            sublabel: 'Категория', route: '/products/psu' },
    { type: 'category', label: 'Охлаждане',              sublabel: 'Категория', route: '/products/cpu-coolers' },
    { type: 'category', label: 'Кутии',                  sublabel: 'Категория', route: '/products/boxes' },
    { type: 'category', label: 'Монитори',               sublabel: 'Категория', route: '/products/monitors' },
    { type: 'category', label: 'Клавиатури',             sublabel: 'Категория', route: '/products/keyboards' },
    { type: 'category', label: 'Мишки',                  sublabel: 'Категория', route: '/products/mouses' },
    { type: 'category', label: 'Аудио',                  sublabel: 'Категория', route: '/products/accessories-peripherals', state: { preSelect: ['Headset', 'Speaker', 'Microphone', 'USB Audio Adapter', 'DAC'] } },
    { type: 'category', label: 'Аксесоари (PC)',         sublabel: 'Категория', route: '/products/accessories-parts' },
    { type: 'category', label: 'Аксесоари (периферни)', sublabel: 'Категория', route: '/products/accessories-peripherals' },
    { type: 'category', label: 'Операционни системи',   sublabel: 'Категория', route: '/products/os' },
    { type: 'category', label: 'Асемблирани конфигурации', sublabel: 'Категория', route: '/products/assembled-pcs' },
  ];

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8080/api/products/search?q=${encodeURIComponent(query)}`
    );
  }

  searchCategories(query: string): SearchResult[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.categories.filter(c =>
      c.label.toLowerCase().includes(q)
    );
  }
}
