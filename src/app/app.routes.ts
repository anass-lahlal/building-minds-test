import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { BuildingsState } from './stores/buildings/buildings.state';
import { SitesState } from './stores/sites/sites.state';
import { BuildingsService } from './services/buildings.service';
import { SitesService } from './services/sites.service';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  {
    path: 'buildings',
    loadComponent: () => import('./pages/buildings/buildings.component').then((m) => m.BuildingsPageComponent),
    providers: [provideStates([BuildingsState]), provideHttpClient(), BuildingsService],
  },
  {
    path: 'sites',
    loadComponent: () => import('./pages/sites/sites.component').then((m) => m.SitesPageComponent),
    providers: [provideStates([SitesState]), provideHttpClient(), SitesService],
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
