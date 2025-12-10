import {
  ApplicationConfig,
  importProvidersFrom, InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {

  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule, FormsModule),
    /*{
      provide: BASE_PATH,
      useValue: environment.API_BASE_PATH,
    },*/
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
