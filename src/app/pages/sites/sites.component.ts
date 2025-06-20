import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SitesState } from '../../stores/sites/sites.state';
import { SitesActions } from '../../stores/sites/sites.actions';
import { SiteType, siteTypes } from '../../models/site.model';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss',
  imports: [NzGridModule, NzSelectModule, FormsModule, NzTableModule],
})
export class SitesPageComponent implements OnInit {
  private store = inject(Store);

  sites = this.store.selectSignal(SitesState.sites);
  filters = this.store.selectSignal(SitesState.filters);
  loading = this.store.selectSignal(SitesState.loading);

  siteTypes = siteTypes;

  ngOnInit(): void {
    this.store.dispatch(new SitesActions.LoadSites());
  }

  onFilterChange(type: SiteType | null) {
    this.store.dispatch(new SitesActions.UpdateSiteTypeFilter(type));
  }
}
