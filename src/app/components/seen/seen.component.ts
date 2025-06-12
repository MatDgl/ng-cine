import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { SeenMovieComponent } from './movie/movie.component';
import { SeenSerieComponent } from './serie/serie.component';

@Component({
  selector: 'app-seen',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterModule,
    CommonModule,
    MaterialModule,
    SeenMovieComponent,
    SeenSerieComponent,
  ],
  templateUrl: './seen.component.html',
  styleUrl: './seen.component.scss',
})
export class SeenComponent implements OnInit {
  readonly items = [
    { label: 'Notes', index: 0, url: '/' },
    { label: 'Envie de voir', index: 1, url: '/wish' },
    { label: 'Critiques', index: 2, url: '/reviews' },
    { label: 'Cinémas', index: 3, url: '/cinemas' },
    { label: 'Collections', index: 4, url: '/collections' },
    { label: 'Amis', index: 5, url: '/friends' },
    { label: 'Préférences', index: 6, url: '/preferences' },
    { label: 'Profil', index: 7, url: '/profile' },
  ];

  currentPath = '';

  ngOnInit(): void {
    this.currentPath = window.location.pathname;
  }
}
