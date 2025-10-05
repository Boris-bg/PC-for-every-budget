import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormFieldModule, MatIconModule, MatInput, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected itemForSearching: String = "";

  protected search() {
    console.log(this.itemForSearching);
    this.demo = this.itemForSearching;
  }

  protected demo: String = "";
}
