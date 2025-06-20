import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppState } from './stores/app/app.state';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    //Provide global store
    provideStore([AppState], withNgxsStoragePlugin({ keys: ['app.tags'] })),
  ],
};
