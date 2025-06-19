import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { BuildingsState } from './stores/buildings/buildings.state';
import { SitesState } from './stores/sites/sites.state';

export const routes: Routes = [
  {
    path: 'buildings',
    loadComponent: () => import('./pages/buildings/buildings.component').then((m) => m.BuildingsPageComponent),
    providers: [provideStates([BuildingsState])],
  },
  {
    path: 'sites',
    loadComponent: () => import('./pages/sites/sites.component').then((m) => m.SitesPageComponent),
    providers: [provideStates([SitesState])],
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
