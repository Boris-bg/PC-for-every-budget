import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
})
export class App {
  protected isProductsOpen = false;
  private closeTimeout: any;
  protected itemForSearching: String = "";

  protected openProducts() {
    clearTimeout(this.closeTimeout);
    this.isProductsOpen = true;
  }

  protected closeProducts() {
    this.closeTimeout = setTimeout(() => {
      this.isProductsOpen = false;
    }, 200);
  }

  protected search() {
    console.log(this.itemForSearching);
  }
}
