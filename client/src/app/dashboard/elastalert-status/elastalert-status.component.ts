import { Component, OnInit } from '@angular/core';
import { ElastalertStatusService } from './elastalert-status.service';
import { Subscription, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'elastalert-status',
  templateUrl: './elastalert-status.component.html',
  styleUrls: ['./elastalert-status.component.scss']
})
export class ElastalertStatusComponent implements OnInit {

  status: boolean;
  statusSubscription: Subscription;
  timerSubscription: Subscription;

  constructor(private statusService: ElastalertStatusService) { }

  ngOnInit() {
    this.refreshStatus();
  }

  public refreshStatus(): void {
    this.statusSubscription = this.statusService.status().subscribe(status => {
      this.status = status;
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    let refreshInterval = environment.elastalert_status_refresh_interval
    this.timerSubscription = Observable.timer(refreshInterval).first().subscribe(() => this.refreshStatus());
  }

}
