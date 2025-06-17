import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { MovieService } from '../../../services/api/movie.service';
import { Movie } from '../../../models/models';

@Component({
  standalone: true,
  selector: 'app-star-rating',
  imports: [MaterialModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
  @Input() data!: Movie;

  constructor(private movieService: MovieService) {}

  readonly starIndexes = [0, 1, 2, 3, 4];
  hoveredRating: number | null = null;
  isSaving = false;

  get displayRating(): number | null {
    return this.hoveredRating;
  }

  getStarIcon(index: number): string {

    const rating = this.hoveredRating ?? this.data.rating ?? 0;

    if (rating >= index + 1) {
      return 'star'; // pleine
    } else if (rating >= index + 0.5) {
      return 'star_half'; // demi
    } else {
      return 'star_border'; // vide
    }
  }

  onMouseMove(event: MouseEvent, index: number) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const half = rect.width / 2;
    const isHalf = mouseX < half;
    this.hoveredRating = index + (isHalf ? 0.5 : 1);
  }

  clearHover() {
    this.hoveredRating = null;
  }

  onClickRating() {
    if (this.isSaving || !this.hoveredRating) return;

    this.data.rating = this.hoveredRating;

    const oldValue = this.data.rating;
    this.isSaving = true;

    this.movieService.updateRating(this.data.id, this.data.rating).subscribe({
      next: () => (this.isSaving = false),
      error: () => {
        this.data.rating = oldValue;
        this.isSaving = false;
      },
    });
  }

  tooltipText(): string {
    const result = this.displayRating + ' - ';
    switch (this.displayRating) {
      case 0.5:
        return result + 'Nul';
      case 1:
        return result + 'Très Mauvais';
      case 1.5:
        return result + 'Mauvais';
      case 2:
        return result + 'Pas terrible';
      case 2.5:
        return result + 'Moyen';
      case 3:
        return result + 'Pas mal';
      case 3.5:
        return result + 'Bien';
      case 4:
        return result + 'Très bien';
      case 4.5:
        return result + 'Excellent';
      case 5:
        return result + "Chef-d'œuvre";
      default:
        return 'Aucune évaluation';
    }
  }
}
