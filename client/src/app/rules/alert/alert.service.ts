import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor() { }

  public alertTypes: string[] = [
    "email",
  ]

}
