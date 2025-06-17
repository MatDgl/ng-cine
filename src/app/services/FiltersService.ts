import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Movie, Serie, SortOption } from '../models/models';
import { MovieService } from './api/movie.service';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  constructor(private movieService: MovieService) {}

  private readonly allSeries: Serie[] = [];

  // Subjects exposés
  private readonly allMovies$ = new BehaviorSubject<Movie[]>([]);

  private rateSubject = new BehaviorSubject<number>(0);
  private sortSubject = new BehaviorSubject<SortOption>(
    SortOption.LASTMODIFIED,
  );
  private serieTypeSubject = new BehaviorSubject<number>(0);
  private visibleCountSubject = new BehaviorSubject<number>(20);

  public rate$ = this.rateSubject.asObservable();
  public sort$ = this.sortSubject.asObservable();
  public serieType$ = this.serieTypeSubject.asObservable();
  public visibleCount$ = this.visibleCountSubject.asObservable();

  public readonly movies$: Observable<Movie[]> = combineLatest([
    this.allMovies$,
    this.rate$,
    this.sort$,
  ]).pipe(
    map(([movies, rate, sort]) => {
      let filtered = [...movies];
      if (rate > 0) {
        filtered = filtered.filter((movie) => movie.rating === rate);
      }
      return this.sortMovies(filtered, sort);
    }),
  );

  public series$: Observable<Serie[]> = combineLatest([
    this.rate$,
    this.sort$,
    this.serieType$,
  ]).pipe(
    map(([rate, sort, serieType]) => {
      let data = [...this.allSeries];

      if (serieType === 1) {
        data = data.filter((serie) => serie.followed);
      } else if (serieType === 2) {
        data = data.filter((serie) => serie.rating && serie.rating > 0);
      }

      if (rate > 0) {
        data = data.filter((serie) => serie.rating === rate);
      }

      return this.sortMovies(data, sort);
    }),
  );

  private sortMovies(data: any[], sort: SortOption) {
    if (sort === SortOption.TITLE) {
      return data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === SortOption.RATING_ASC) {
      return data.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sort === SortOption.RATING_DESC) {
      return data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      return data.sort(
        (a, b) =>
          (b.lastModified || new Date(0)).getTime() -
          (a.lastModified || new Date(0)).getTime(),
      );
    }
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (movies) => this.allMovies$.next(movies),
      error: (err) =>
        console.error('Erreur lors du chargement des films :', err),
    });
  }

  limitedMovies$: Observable<Movie[]> = combineLatest([
    this.movies$,
    this.visibleCount$,
  ]).pipe(map(([movies, count]) => movies.slice(0, count)));

  limitedSeries$: Observable<Serie[]> = combineLatest([
    this.series$,
    this.visibleCount$,
  ]).pipe(map(([series, count]) => series.slice(0, count)));

  showMore(): void {
    this.visibleCountSubject.next(this.visibleCountSubject.value + 20);
  }

  resetVisibleCount(): void {
    this.visibleCountSubject.next(20);
  }

  get rateValue(): number {
    return this.rateSubject.getValue();
  }

  get sortValue(): SortOption {
    return this.sortSubject.getValue();
  }

  get serieTypeValue(): number {
    return this.serieTypeSubject.getValue();
  }

  setRate(rate: number) {
    this.rateSubject.next(rate);
  }

  setSort(sort: SortOption) {
    this.sortSubject.next(sort);
  }

  setSerieType(type: number) {
    this.serieTypeSubject.next(type);
  }
}
