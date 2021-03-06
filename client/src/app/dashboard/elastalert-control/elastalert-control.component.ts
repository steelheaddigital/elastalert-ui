import { Component, OnInit } from '@angular/core';
import { ElastalertControlService } from './elastalert-control.service'

@Component({
  selector: 'elastalert-control',
  templateUrl: './elastalert-control.component.html',
  styleUrls: ['./elastalert-control.component.scss']
})
export class ElastalertControlComponent implements OnInit {

  constructor(private controlService: ElastalertControlService) { }

  ngOnInit() {
  }

  public restart() {
    this.controlService.restart().subscribe(pid => {
      alert("Elastalert successfully restarted with PID: " + pid)
    })
  }

  public start() {
    this.controlService.start().subscribe(pid => {
      alert("Elastalert successfully started with PID: " + pid)
    })
  }

   public stop() {
    this.controlService.stop().subscribe(pid => {
      alert("Elastalert successfully stopped for PID: " + pid)
    })
  }

}
