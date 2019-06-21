// Vendors
import { Component, OnInit } from '@angular/core';

// Services
import { AuthorsService, AlertService } from 'src/app/shared/services';
// Models
import { IAuthor } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-edit-authors',
  templateUrl: './edit-authors.component.html',
  styleUrls: ['./edit-authors.component.scss']
})
export class EditAuthorsComponent implements OnInit {

  private authors: IAuthor[] = [];
  private visibility: string;
  private authorNameModalVisibility: boolean;
  private changedAuthor: IAuthor;
  private newAuthorModal: boolean;
  private page: number;
  private total: number;

  constructor(
    private authorsService: AuthorsService,
    private alertService: AlertService
  ) {
    this.getPage(this.page);
    this.authorNameModalVisibility = false;
    this.newAuthorModal = false;
  }

  ngOnInit() {
  }

  private getPage(page: number): void {
    const paging = {
      currentPage: page
    };
    this.authorsService.paging(paging).subscribe((res) => {
      this.authors = res;
      this.page = page;
      this.getTotal();
    },
    (err) => {
      console.log(err);
    });
  }

  private getTotal(): void {
    this.authorsService.getTotal().subscribe((res) => {
      this.total = res;
    },
    (err) => {
      console.log(err);
    });
  }

  private openModal(author: IAuthor): void {
    this.changedAuthor = author;
    this.authorNameModalVisibility = true;
  }

  private showAuthorInfo(bookId: string): void {
    if (this.visibility === bookId) {
      this.visibility = '';
      return;
    }
    this.visibility = bookId;
  }

  private closeNewAuthorModal(): void {
    this.newAuthorModal = false;
  }

  private showModalAddNewAuthor(): void {
    this.newAuthorModal = true;
  }

  private addAuthor(authorName: string): void {
    let author: IAuthor;
    author = {
      name: authorName
    };
    this.authorsService.addNewAuthor(author).subscribe((res) => {
      this.authors.push(res);
      this.newAuthorModal = false;
      this.getPage(this.page);
      this.alertService.success('Author is added', false);
    },
    (err) => {
      console.log(err);
      this.alertService.error(err.error.error);
    });
  }

  private closeAuthorNameModal(): void {
    this.authorNameModalVisibility = false;
  }

  private changeName(authorName: string): void {
    let author: IAuthor;
    author = {
      id: this.changedAuthor.id,
      name: authorName
    };

    this.authorsService.changeAuthorName(author).subscribe((res) => {
      for (let i = 0; i < this.authors.length; i++) {
        if (this.authors[i].id === author.id) {
          this.authors[i] = author;
          this.authorNameModalVisibility = false;
        }
      }
      this.alertService.success('Author is changed', false);
    },
    (err) => {
      console.log(err);
      this.alertService.error('Wrong data', false);
    });
  }

  private deleteAuthor(author: IAuthor): void {
    this.authorsService.deleteAuthor(author).subscribe((res) => {
      for (let i = 0; i < this.authors.length; i++) {
        if (this.authors[i] === author) {
          this.authors.splice(i, 1);
          this.getPage(this.page);
        }
      }
      this.alertService.success('Author is delete', false);
    },
    (err) => {
      console.log(err);
      this.alertService.error('Wrong data', false);
    });
  }

}
