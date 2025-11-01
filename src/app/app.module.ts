  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatListModule } from '@angular/material/list';
  import { MatIconModule } from '@angular/material/icon';
  import { MatButtonModule } from '@angular/material/button';
  import { MatInputModule } from '@angular/material/input';
  import { MatFormFieldModule } from '@angular/material/form-field';

  import { AppRoutingModule } from './app.routes';
  import { App } from './app';
  import {MatExpansionPanel} from "@angular/material/expansion";
  import { MatExpansionModule } from '@angular/material/expansion';

  @NgModule({
    declarations: [
      App
    ],
      imports: [
          BrowserModule,
          CommonModule,
          FormsModule,
          BrowserAnimationsModule,
          AppRoutingModule,
          MatToolbarModule,
          MatSidenavModule,
          MatListModule,
          MatIconModule,
          MatButtonModule,
          MatInputModule,
          MatFormFieldModule,
          MatExpansionPanel,
          MatExpansionModule
      ],
    providers: [],
    bootstrap: [App]
  })
  export class AppModule { }
