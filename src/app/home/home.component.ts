import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  genres = [
    { name: 'Fiction', icon: 'assets/svg-icons/Fiction.svg' },
    { name: 'Adventure', icon: 'assets/svg-icons/Adventure.svg' },
    { name: 'Humour', icon: 'assets/svg-icons/Humour.svg' },
    { name: 'Politics', icon: 'assets/svg-icons/Politics.svg' },
    { name: 'Philosophy', icon: 'assets/svg-icons/Philosophy.svg' },
    { name: 'History', icon: 'assets/svg-icons/History.svg' },
    { name: 'Adventure', icon: 'assets/svg-icons/Adventure.svg' }
  ];

  constructor(private router: Router) {
   
  }

  selectGenre(genre: string) {
    this.router.navigate(['/books', genre]);
  }
}
