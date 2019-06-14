// Vendors
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { BooksService, AlertService, AuthorsService } 
from 'src/app/shared/services';
// Models
import { BookModel } 
from 'src/app/shared/models';
// Interfaces
import { IAuthor } 
from "src/app/shared/interfaces"


@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.scss']
})
export class EditBooksComponent implements OnInit {

  private newBookForm: FormGroup;
  private disabled: boolean = false;
  private ShowFilter: boolean = true;
  private authors: IAuthor[];
  private selectedItems: string[] = [];
  private dropdownSettings: any = {};
  private newBookModalVisibility: boolean;
  private newAuthorModalVisibility: boolean;
  private inputAuthor: string;
  private total: number;

  private books: BookModel[];

  private visibility: string;
  private modalVisibility: boolean;
  private changeForm: FormGroup;
  private bookForChange: BookModel;
  private page: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private authorsService: AuthorsService,
    private alertService: AlertService
  ) {
    this.newBookModalVisibility = false
    this.newAuthorModalVisibility = false
    this.getPage(this.page)

  }

  ngOnInit() {
    this.getAllAuthors()

    this.newBookForm = this.formBuilder.group({
      newBookTitle: new FormControl(
        "", [
          Validators.required
      ]),
      newBookType: new FormControl(
        "", [
          Validators.required
      ]),
      newBookAuthor: [this.selectedItems],
      newBookInfo: new FormControl(
        "", [
          Validators.required
      ]),
      newBookPrice: new FormControl(
        "", [
          Validators.required
      ]),
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
  };

    this.changeForm = this.formBuilder.group ({
      id: new FormControl(
        "", [
      ]),
      name: new FormControl(
        "", [
          Validators.required
      ]),
      type: new FormControl(
        "", [
          Validators.required
      ]),
      authors: [this.selectedItems],
      description: new FormControl(
        "", [
          Validators.required
      ]),
      price: new FormControl(
        "", [
          Validators.required
      ]),
    })
  }

  private getPage(page: number): void {
    let paging = {
      currentPage: page
    }
    this.booksService.paging(paging).subscribe((res) => {
      this.books = res
      this.page = page
      this.getTotal()
    },
    (error) => {
      console.log(error)
    })
  }

  private getTotal(): void {
    this.booksService.getTotal().subscribe((res) => {
      this.total = res
    },
    (err) => {
      console.log(err)
    })
  }

  private showModalAddNewAuthor(): void {
    this.newAuthorModalVisibility = true;
  }

  private closeNewAuthorModal(): void {
    this.newAuthorModalVisibility = false;
  }

  private showModalAddNewBook(): void {
    this.newBookModalVisibility = true;
  }

  private closeNewBookModal(): void {
    this.newBookModalVisibility = false;
  }

  private showBookInfo(bookId: string): void {
    if (this.visibility === bookId) {
      this.visibility = "";
      return;
    }
    this.visibility = bookId;
  }

  private addNewAuthor(authorName: string): void {
    let author: IAuthor;
    author = {
      name: authorName
    }
    this.authorsService.addNewAuthor(author).subscribe((res) => {
      this.authors.push(res)
      console.log(this.authors)
      this.newAuthorModalVisibility = false
      this.alertService.success("Author is added")
    },
    (err) => {
      console.log(err)
      this.alertService.error(err.error.error)
    })
    
  }

  private getAllAuthors(): void {
    this.authorsService.getAllAuthors().subscribe((res) => {
      this.authors = res
    },
    (err) => {
      console.log(err)
    })
  }

  private addNewBook(): void {
    this.booksService.addNewBook(this.newBookForm.value).subscribe((res) => {
      this.books.push(res);
      this.newBookForm.reset();
      this.newBookModalVisibility = false;
      this.getPage(this.page)
      this.alertService.success("Book is created")
    },
    (err) => {
      console.log(err)
      this.alertService.error(err.error.error)
    })
  }

  private openModal(book: BookModel): void {
    this.modalVisibility = true;
    this.bookForChange = book;
  }

  private closeModal(): void {
    this.modalVisibility = false;
  }

  private changeBook(): void {
    this.changeForm.value.id = this.bookForChange.id
    this.booksService.changeBook(this.changeForm.value).subscribe((res) => {
      console.log(res)
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].id === this.bookForChange.id) {
          this.books[i] = this.changeForm.value
        }
      }
      this.modalVisibility = false;
      this.alertService.success("Book is change")
    },
    (err) => {
      console.log(err)
      this.alertService.success(err.error.error)
    })
  }

  private deleteBook(book: BookModel): void {

    this.booksService.deleteBook(book).subscribe((res) => {
      console.log(res)
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i] === book) {
          this.books.splice(i, 1)
        }
      }
      this.alertService.success("Book is delete")
    },
    (err) => {
      console.log(err)
      this.alertService.success(err.error.error)
    });
  }
}
