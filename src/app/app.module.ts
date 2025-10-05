import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { App } from './app';

bootstrapApplication(App, {
  providers: [
    provideRouter([]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
}).catch(err => console.error(err));
