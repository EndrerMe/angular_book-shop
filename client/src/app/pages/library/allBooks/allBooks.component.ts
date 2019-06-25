// Vendors
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { BagService, BooksService } from 'src/app/shared/services';
// Models
import { BookModel } from 'src/app/shared/models';


@Component({
  selector: 'app-all-books',
  templateUrl: './allBooks.component.html',
  styleUrls: ['./allBooks.component.scss'],
})
export class AllBooksComponent implements OnInit {

  private books: BookModel[];
  private page: number ;
  private total: number;
  private perPage: number;
  constructor(
    private bagService: BagService,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getPage(this.page);
  }
  ngOnInit() {
  }

  private getBooks(): void {
    this.booksService.getBooks().subscribe((res) => {
      this.books = res;
    },
    (error) => {
      console.log(error);
    });
  }

  private getTotal(): void {
    this.booksService.getTotal().subscribe((res) => {
      this.total = res;
    },
    (err) => {
      console.log(err);
    });
  }

  private getPage(page: number): void {
    const paging = {
      currentPage: page
    };
    this.booksService.paging(paging).subscribe((res) => {
      this.books = res;
      this.page = page;
      this.getTotal();
    },
    (err) => {
      console.log(err);
    });
  }



  private addToBag(book: BookModel): void {
    this.bagService.addToBag(book);
  }

  private trackByFn(index, item) {
    return index;
  }

  private searchByTitle(title: string): void {
    if (title === '') {
      this.clearFilter();
    }
    this.booksService.searchByTitle({title}).subscribe((res) => {
      this.books = res;
      this.total = this.books.length;
    },
    (err) => {
      console.log(err);
    });
  }

  private searchByAuthor(author: string): void {
    if (author === '') {
      this.clearFilter();
    }
    this.booksService.searchByAuthor({author}).subscribe((res) => {
      this.books = res;
      this.total = this.books.length;
    },
    (err) => {
      console.log(err);
    });
  }

  private searchByType(type: string): void {
    if (type === '') {
      this.clearFilter();
    }
    this.booksService.searchByType({type}).subscribe((res) => {
      this.books = res;
      this.total = this.books.length;
    },
    (err) => {
      console.log(err);
    });
  }

  private clearFilter() {
      this.getBooks();
      this.getPage(1);
  }

  private showBook(id: string): void {
    this.router.navigate(['book/' + id]);
  }

  private filterByPrice(min: number, max: number): void {
    if (!min) {
      min = 0;
    }

    if (!max) {
      max = 9999;
    }

    if (!min && !max) {
      this.clearFilter();
    }
    const price = {
      min: min,
      max: max
    };
    this.booksService.searchByPrice(price).subscribe((res) => {
      this.books = res;
      this.total = this.books.length;
    },
    (err) => {
      console.log(err);
    });
  }

}
