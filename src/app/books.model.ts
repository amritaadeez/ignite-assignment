export interface BooksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export interface Book {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  bookshelves: string[];
  copyright: boolean;
  download_count: number;
  formats: { [key: string]: string };
  languages: string[];
  media_type: string;
  subjects: string[];
  translators: string[];
}

export interface Author {
  name: string;
  birth_year?: number;
  death_year?: number;
}
