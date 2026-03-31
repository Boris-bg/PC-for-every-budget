import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RAM } from '../models/RAM';
import { RamService } from '../services/ram.service';

@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [],
  templateUrl: './ram.html',
  styleUrl: './ram.css'
})
export class Ram implements OnInit {
  protected rams: RAM[] = [];

  constructor(private ramService: RamService) {}

  ngOnInit() {
    this.ramService.getAll().subscribe(data => {
      this.rams = data;
    });
  }
}
