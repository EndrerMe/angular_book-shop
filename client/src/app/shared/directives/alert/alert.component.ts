// Vendors
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription;
  message: string;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.subscription = this.alertService.getMessage().subscribe(message => {
          this.message = message;
          setTimeout(() => {
            this.message = '';
          }, 2000);
      });
  }

 ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
