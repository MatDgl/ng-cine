import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { Context, Sort, SortOption } from '../../../models/models';
import { CommonModule } from '@angular/common';
import { FiltersService } from '../../../services/FiltersService';
import { trackById } from '../../../functions/global';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Input({ required: true }) context!: Context;

  constructor(private filterService: FiltersService) {}

  readonly sortBy: Sort[] = [
    { label: 'Dernières modifications', value: SortOption.LASTMODIFIED, id: 0 },
    { label: 'Notes décroissantes', value: SortOption.RATING_DESC, id: 1 },
    { label: 'Notes croissantes', value: SortOption.RATING_ASC, id: 2 },
    { label: 'Titres A-Z', value: SortOption.TITLE, id: 3 },
  ];
  readonly rates = [
    { label: 'Toutes les notes', value: 0, id: -1 },
    { label: '1 étoile', value: 1, id: 0 },
    { label: '2 étoiles', value: 2, id: 1 },
    { label: '3 étoiles', value: 3, id: 2 },
    { label: '4 étoiles', value: 4, id: 3 },
    { label: '5 étoiles', value: 5, id: 4 },
  ];

  readonly serieTypes = [
    { label: 'Toutes les séries', value: 0, id: -1 },
    { label: 'Séries que je suis', value: 1, id: 0 },
    { label: 'Séries notées', value: 2, id: 1 },
  ];

  readonly selectedSort = this.filterService.sortValue;
  readonly selectedRate = this.filterService.rateValue;
  readonly selectedSerieType = this.filterService.serieTypeValue;

  readonly Context = Context;

  readonly trackById = trackById;

  onSortChange(value: SortOption) {
    this.filterService.setSort(value);
  }

  onRateChange(value: number) {
    this.filterService.setRate(value);
  }

  onSerieTypeChange(value: number) {
    this.filterService.setSerieType(value);
  }
}
