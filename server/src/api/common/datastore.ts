import * as fs from 'fs';
import * as path from 'path'
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
let config = require('../../../config');

export interface IDataStore {
  write(fileName: string, data: any): Promise<any>
  read(fileName: string): Promise<string>
  delete(fileName: string): Promise<any>
  readdir(path: string): Promise<string[]>
}

export class FsDataStore implements IDataStore{

  write(fileName: string, data: any): Promise<any> {
    return new Promise( (resolve,reject) => {
      fs.writeFile(path.join(fileName), data, { 'encoding': 'utf8' }, (err) => {
        if(err !== null) return reject(err);
        return resolve();
      });
    });
  }

  read(fileName: string): Promise<string> {
    return new Promise( (resolve,reject) => {
      fs.readFile(fileName, 'utf8', (err,data) => {
        if(err !== null) return reject(err);
        return resolve(data);
      });
    })
  }

  delete(fileName: string): Promise<any> {
    return new Promise( (resolve,reject) => {
      fs.unlink(fileName, (err) => {
        if(err !== null) return reject(err);
        return resolve();
      });
    })
  }

  readdir(path: string): Promise<string[]> {
    return new Promise( (resolve,reject) => {
      fs.readdir(path, (err,files) => {
        if(err !== null) return reject(err);
        return resolve(files);
      });
    })
  }

}