// Vendors
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { BagService, BooksService } from 'src/app/shared/services';
// Models
import { BookModel } from 'src/app/shared/models';


@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  private book: BookModel;

  constructor(
    private route: ActivatedRoute,
    private bagService: BagService,
    private booksService: BooksService
    ) {
      this.getBook(this.route.snapshot.paramMap.get('id'));
    }

  ngOnInit() {
  }

  private getBook(id: string): void {
    this.booksService.getBookById(id).subscribe((res) => {
      this.book = res;
    },
    (err) => {
      console.log(err);
    });
  }

  private addToBag(): void {
    this.bagService.addToBag(this.book);
  }

  private addNewObjectToBag(book: BookModel): void {
    this.bagService.bag.push(book);
    localStorage.setItem('bag', JSON.stringify(this.bagService.bag));
  }

}
