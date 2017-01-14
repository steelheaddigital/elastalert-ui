import * as fs from 'fs';
import * as path from 'path'
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
let config = require('../../../config');

export interface IDataStore {
  write(fileName: string, data: any): Promise<any>
  read(fileName: string): Promise<any>
}

export class FsDataStore implements IDataStore{

  write(fileName: string, data: any): Promise<any> {
    return new Promise( (resolve,reject) => {
      fs.writeFile(path.join(fileName), data, 'utf8', (err) => {
        if(err !== null) return reject(err);
        return resolve();
      });
    });
  }

  read(fileName: string): Promise<any> {
    return new Promise( (resolve,reject) => {
      fs.readFile(fileName, 'utf8', (err,data) => {
        if(err !== null) return reject(err);
        return resolve(data);
      });
    })
  }

}