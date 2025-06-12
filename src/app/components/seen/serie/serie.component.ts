import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../../../services/FiltersService';
import { MaterialModule } from '../../../shared/material/material.module';
import { CardComponent } from '../../shared/card/card.component';
import { trackById } from '../../../functions/global';
import { Context } from '../../../models/models';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-seen-serie',
  standalone: true,
  imports: [MaterialModule, CommonModule, CardComponent, FiltersComponent],
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.scss',
})
export class SeenSerieComponent {
  readonly context = Context.SERIE;

  constructor(private filterService: FiltersService) {}

  series$ = this.filterService.limitedSeries$;

  trackById = trackById;

  showMore(): void {
    this.filterService.showMore();
  }

  readonly canShowMore$ = combineLatest([
    this.filterService.series$,
    this.series$,
  ]).pipe(map(([all, visible]) => all.length > visible.length));
}
