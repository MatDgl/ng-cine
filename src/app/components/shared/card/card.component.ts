import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../models/models';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, CommonModule, StarRatingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  // @Input() data: Movie | null = null;
  @Input() data!: Movie;

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/movie/default.png';
  }
}
