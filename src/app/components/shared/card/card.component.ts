import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../models/models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() data: Movie | null = null;

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
