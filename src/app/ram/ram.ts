import {Component, OnInit} from '@angular/core';
import {RAM} from '../models/RAM';
import {RamService} from '../services/ram.service';

@Component({
  selector: 'app-ram',
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
