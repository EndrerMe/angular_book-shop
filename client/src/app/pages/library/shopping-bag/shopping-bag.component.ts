// Vendors
import { Component, OnInit } from '@angular/core';

// MOdels
import { BookModel } from 'src/app/shared/models';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {

  public bag: BookModel[]= JSON.parse(localStorage.getItem('bag'));

  public value: number;
  public visibility: boolean;
  
  constructor() {
    this.visibility = false
  }

  ngOnInit() {
    if (localStorage.getItem('bag') !== null) {
      this.visibility = false
    } else {
      this.visibility = true;
    }
  }

  private changePrice(book: BookModel, value: number):void {
    for (let i = 0; i < this.bag.length; i++) {
      if (book.id === this.bag[i].id) {
        this.bag[i].value = value
      }
    }
  }

  private clearBag(): void {
    localStorage.removeItem('bag');
    this.bag = []
    this.visibility = true
  }

}
