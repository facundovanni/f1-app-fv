import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),
    provideAnimations(),
    provideNzI18n(es_ES),
    importProvidersFrom(HttpClientModule)
  ],
};
