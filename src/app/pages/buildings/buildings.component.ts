import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BuildingsState } from '../../stores/buildings/buildings.state';
import { BuildingsActions } from '../../stores/buildings/buildings.actions';
import { BuildingType, buildingTypes } from '../../models/building.model';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrl: './buildings.component.scss',
  imports: [NzGridModule, NzSelectModule, FormsModule, NzTableModule],
})
export class BuildingsPageComponent implements OnInit {
  private store = inject(Store);
  buildings = this.store.selectSignal(BuildingsState.buildings);
  filters = this.store.selectSignal(BuildingsState.filters);
  loading = this.store.selectSignal(BuildingsState.loading);

  buildingTypes = buildingTypes;

  ngOnInit(): void {
    this.store.dispatch(new BuildingsActions.LoadBuildings());
  }

  onFilterChange(type: BuildingType | null) {
    this.store.dispatch(new BuildingsActions.UpdateBuildingTypeFilter(type));
  }
}
