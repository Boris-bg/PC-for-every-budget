import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected isProductsOpen = false;
  protected isSidenavExpanded = false;
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

  protected expandSidenav() {
    this.isSidenavExpanded = true;
  }

  protected collapseSidenav() {
    this.isSidenavExpanded = false;
  }

  protected search() {
    console.log(this.itemForSearching);
  }
}
