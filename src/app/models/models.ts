export interface Movie {
  id: number;
  title: string;
  src: string;
  href?: string;
  rating?: number; // Optional property for rating
  lastModified?: Date; // Optional property for last modified date
}

export interface Serie extends Movie {
  followed: boolean; // Optional property for followed status
}

export interface Sort {
  id: number;
  value: SortOption;
  label: string;
}
export enum SortOption {
  LASTMODIFIED = 'lastModified',
  TITLE = 'titleAsc',
  RATING_DESC = 'ratingDesc',
  RATING_ASC = 'ratingAsc',
}

export enum Context {
  MOVIE = 'movie',
  SERIE = 'serie',
}
