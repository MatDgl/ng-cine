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
  selector: 'app-seen-movie',
  standalone: true,
  imports: [MaterialModule, CommonModule, CardComponent, FiltersComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class SeenMovieComponent implements OnInit {
  readonly context = Context.MOVIE;

  constructor(private filterService: FiltersService) {}

  ngOnInit(): void {
    this.filterService.loadMovies();
  }

  movies$ = this.filterService.limitedMovies$;

  trackById = trackById;

  showMore(): void {
    this.filterService.showMore();
  }

  readonly canShowMore$ = combineLatest([
    this.filterService.movies$, // tous les films filtrés
    this.movies$, // films affichés avec slice
  ]).pipe(map(([all, visible]) => all.length > visible.length));
}
