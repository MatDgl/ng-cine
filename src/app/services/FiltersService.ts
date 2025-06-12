import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Movie, Serie, SortOption } from '../models/models';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  // Valeurs initiales
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

  private readonly allSeries: Serie[] = [];

  // Subjects exposés
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

  public movies$: Observable<Movie[]> = combineLatest([
    this.rate$,
    this.sort$,
  ]).pipe(
    map(([rate, sort]) => {
      let data = [...this.allMovies];

      if (rate > 0) {
        data = data.filter((movie) => movie.rating === rate);
      }

      return this.sortMovies(data, sort);
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
