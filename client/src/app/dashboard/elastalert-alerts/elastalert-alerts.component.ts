import { Component, OnInit } from '@angular/core';
import { ElastalertAlertsService } from './elastalert-alerts.service'
import { Subscription, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'elastalert-alerts',
  templateUrl: './elastalert-alerts.component.html',
  styleUrls: ['./elastalert-alerts.component.scss']
})
export class ElastalertAlertsComponent implements OnInit {

  alertData: Object = {}

  constructor(private alertsService: ElastalertAlertsService) { }

  ngOnInit() {
    this.getAlerts();
  }

  public getAlerts(): void {
    this.alertsService.getAlerts().subscribe(alerts => {
      this.alertData = alerts;
    })
  }

}
