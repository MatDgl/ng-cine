import { Component, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { Movie, Sort, SortOption } from '../../../models/models';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-seen-movie',
  standalone: true,
  imports: [MaterialModule, CommonModule, CardComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class SeenMovieComponent implements OnDestroy {
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
  private readonly allMovies: Movie[] = [
    { title: 'Troie', src: 'assets/img/movie/troie.jpg', id: 0, rating: 5 },
    {
      title: 'Django Unchained',
      src: 'assets/img/movie/django.jpg',
      id: 1,
      rating: 5,
    },
    {
      title: 'Interstellar',
      src: 'assets/img/movie/interstellar.jpg',
      id: 2,
      rating: 4,
    },
    {
      title: 'Inception',
      src: 'assets/img/movie/inception.jpg',
      id: 3,
      rating: 5,
    },
    {
      title: 'The Dark Knight',
      src: 'assets/img/movie/dark_knight.jpg',
      id: 4,
      rating: 4,
    },
    {
      title: 'Pulp Fiction',
      src: 'assets/img/movie/pulp_fiction.jpg',
      id: 5,
      rating: 5,
    },
    { title: 'Seven', src: 'assets/img/movie/seven.jpg', id: 6, rating: 4.5 },
  ];

  // Subjects pour les filtres/tri
  rateSubject = new BehaviorSubject<number>(0);
  sortSubject = new BehaviorSubject<SortOption>(
    SortOption.LASTMODIFIED
  );

  // Observables publics
  movies$: Observable<Movie[]> = combineLatest([
    this.rateSubject,
    this.sortSubject,
  ]).pipe(
    map(([rate, sort]) => {

      let filtered = [...this.allMovies];

      if (rate !== 0) {
        filtered = filtered.filter((movie) => movie.rating === rate);
      }

      if (sort === SortOption.LASTMODIFIED) {
        filtered.sort(
          (a, b) =>
            (b.lastModified || new Date(0)).getTime() -
            (a.lastModified || new Date(0)).getTime()
        );
      } else if (sort === SortOption.TITLE) {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === SortOption.RATING_DESC) {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sort === SortOption.RATING_ASC) {
        filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      }

      return filtered;
    })
  );

  trackById(item: any): number {
    return item.id;
  }

  onSortChange(value: SortOption): void {
    this.sortSubject.next(value);
  }

  onRateChange(value: number): void {
    this.rateSubject.next(value);
  }

  ngOnDestroy(): void {
    // Nettoyage des subjects pour éviter les fuites de mémoire
    this.rateSubject.complete();
    this.sortSubject.complete();
  }
}
