import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../models/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly baseUrl = 'http://localhost:8000'; // À externaliser plus tard

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movie`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`);
  }

  updateRating(id: number, rating: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/movie/${id}`, { rating });
  }
}
