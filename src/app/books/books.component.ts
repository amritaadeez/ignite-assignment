import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GutendexService } from '../gutendex.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Book, BooksResponse } from '../books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  genre: string = '';
  page = 1;
  loading = false;
  hasMoreBooks = true;
  searchQuery = '';
  private searchSubject = new Subject<string>();
  loadingMore = false;
  placeholders: any[] = new Array(20);
  searchTerm: string  = '';

  constructor(
    private route: ActivatedRoute,
    private gutendexService: GutendexService
  ) {}

  ngOnInit() {
    this.genre = this.route.snapshot.paramMap.get('genre')!;
    this.loadBooks();
    console.log('data')
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.page = 1;
      this.books = [];
      this.searchBooks(query);
    });
  }

  loadBooks() {
    this.loading = true;
    this.gutendexService.getBooksByCategory(this.genre, this.page).subscribe(
      (data: BooksResponse) => {
        console.log(data)
        this.loading = false;
        this.loadingMore = false;
        if (data.results.length === 0) {
          this.hasMoreBooks = false;
        } else {
          this.books = [...this.books, ...data.results];
          this.page++;
        }
      },
      (error) => {
        console.error('Error loading books:', error);
        this.loading = false;
        this.loadingMore = false;
      }
    );
  }

  searchBooks(event: any) {
    this.loading = true;
    this.searchTerm = event.target.value;
    this.gutendexService.searchBooks(this.searchTerm, this.genre).subscribe(
      (response: any) => {
        this.books = response.results;
        this.hasMoreBooks = response.count;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error searching books:', error);
      }
    );
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadingMore = true;
      this.loadBooks();
    }
  }

  viewBook(book: any) {
    const formats = ['text/html', 'application/pdf', 'text/plain'];
    for (const format of formats) {
      if (book.formats[format]) {
        window.open(book.formats[format], '_blank');
        return;
      }
    }
    alert('No viewable version available');
  }

  onSearchInput(event: any) {
    this.searchSubject.next(event.target.value);
  }

  clearSearch() {
    this.searchTerm = ''; // Clear the input
  }
}
