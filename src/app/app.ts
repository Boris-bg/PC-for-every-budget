import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
})
export class App {
  protected itemForSearching: String = "";

  protected search() {
    console.log(this.itemForSearching);
  }
}
