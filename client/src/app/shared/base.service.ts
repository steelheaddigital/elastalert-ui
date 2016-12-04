import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';

export class BaseService {
  protected extractData(res: Response): IJsendResponse {
    return res.json();
  }
  
  protected handleError (error: any) {
    let response: IJsendResponse
    try {
      response = error.json();
    } catch ( jsonError ) {
      response = {
        status: 'error',
        message: "Something went horribly wrong.",
        data: null
      };
    }
    return( Observable.throw( response ) );
  }

  protected BuildJsonRequest(data: Object) {
    let request = new JsonRequest();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    request.body = JSON.stringify(data)
    request.options = new RequestOptions({ headers: headers });

    return request;
  }
}

export interface IJsendResponse {
  status: string;
  data: any;
  message: string;
}

export class JsonRequest {
  body: string;
  options: RequestOptions;
}