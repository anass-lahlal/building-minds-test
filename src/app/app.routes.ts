import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { BuildingsState } from './stores/buildings/buildings.state';
import { SitesState } from './stores/sites/sites.state';
import { BuildingsService } from './services/buildings.service';
import { SitesService } from './services/sites.service';
import { provideHttpClient } from '@angular/common/http';
import { withStorageFeature } from '@ngxs/storage-plugin';

/**
 * NOTE:
 * @ngxs/storage-plugin is used to persist the state of buildings and sites filters locally.
 * However, I would prefer more persisting the filter state as queries in the URL, this way
 * the user can share/bookmark the URL with the filters applied.
 * N.B. I can implement it if it's required.
 */

export const routes: Routes = [
  {
    path: 'buildings',
    loadComponent: () => import('./pages/buildings/buildings.component').then((m) => m.BuildingsPageComponent),
    providers: [
      provideStates([BuildingsState], withStorageFeature(['buildings.filters'])),
      provideHttpClient(),
      BuildingsService,
    ],
  },
  {
    path: 'sites',
    loadComponent: () => import('./pages/sites/sites.component').then((m) => m.SitesPageComponent),
    providers: [provideStates([SitesState], withStorageFeature(['sites.filters'])), provideHttpClient(), SitesService],
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
