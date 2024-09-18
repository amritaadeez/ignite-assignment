import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; 
import { withInterceptorsFromDi } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [ provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
