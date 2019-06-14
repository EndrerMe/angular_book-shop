//Vendors
import { Injectable } from '@angular/core';

//Models
import { BookModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  public bag: BookModel[] = [] as BookModel[];

  constructor() {
    if (localStorage.getItem("bag")) {
      this.bag = JSON.parse(localStorage.getItem('bag'));
    }
  }

  public getBag(): BookModel[] {
    return this.bag
  }

  public addToBag(book: BookModel): void {
    if (this.bag.length === 0) {
      book.value = 1;
      this.bag.push(book);
      localStorage.setItem('bag', JSON.stringify(this.bag));
      return;
    }
    if (this.bag.length !== 0) {
      let flag = false;
      for (let i = 0; i < this.bag.length; i++) {
        if (this.bag[i].id !== book.id) {
          flag = false;
        } else {
          this.bag[i].value ++;
          flag = true;
          break;
        }
      }

      if (flag) {
        localStorage.setItem('bag', JSON.stringify(this.bag));
      }
      if (!flag) {
        book.value = 1;
        this.bag.push(book);
        localStorage.setItem('bag', JSON.stringify(this.bag));
      }
    }
    
  }
}
