import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { BuildingsState } from './stores/buildings/buildings.state';
import { SitesState } from './stores/sites/sites.state';
import { BuildingsService } from './services/buildings.service';
import { SitesService } from './services/sites.service';

export const routes: Routes = [
  {
    path: 'buildings',
    loadComponent: () => import('./pages/buildings/buildings.component').then((m) => m.BuildingsPageComponent),
    providers: [provideStates([BuildingsState]), BuildingsService],
  },
  {
    path: 'sites',
    loadComponent: () => import('./pages/sites/sites.component').then((m) => m.SitesPageComponent),
    providers: [provideStates([SitesState]), SitesService],
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
