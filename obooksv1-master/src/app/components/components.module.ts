import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { FullPageBooksComponent } from './full-page-books/full-page-books.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';



@NgModule({
  declarations: [BooksComponent, FullPageBooksComponent, ListCategoriesComponent],
  imports: [
    CommonModule
  ],
  exports:[
    BooksComponent,
    FullPageBooksComponent,
    ListCategoriesComponent
  ]

})
export class ComponentsModule { }
