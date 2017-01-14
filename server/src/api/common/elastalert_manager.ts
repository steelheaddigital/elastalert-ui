import * as fs from 'fs';
import * as winston from 'winston';
const exec = require('child_process').exec;
const config = require('../../../config');

export class ElastalertManager {
  pidFilePath = config.elastalertDir + '/pid';
  
  constructor(){
  }

  public start(): number {
    let child = exec('python -m elastalert.elastalert --verbose', {
      cwd: config.elastalertDir
    });

    if(child.pid){
      let pidFile = fs.createWriteStream(this.pidFilePath);
      pidFile.write(child.pid.toString());
      pidFile.end();
    }

    //for some reason elastalert writes everthing to stderr
    child.stderr.on('data', function(data) {
      winston.info(data, {process: 'elastalert'})
    });
    
    child.on('close', function(code) {
      winston.log('info', code), {process: 'elastalert'};
      removePidFile();
    });

    process.on('SIGTERM', function() {
      removePidFile();
      process.exit();
    });
    process.on('SIGINT', function() {
      removePidFile();
      process.exit();
    });

    function removePidFile() {
      fs.unlink(config.elastalertDir + '/pid', function (err) {
        console.log(err);
      });
    }

    return child.pid;
  }

  public stop(): Promise<number> {
    return new Promise( (resolve,reject) => {
      fs.readFile(this.pidFilePath, 'utf8', (err,data) => {
        let pid: number = <number><any>data;
        process.kill(pid, 'SIGTERM');
        resolve(pid)       
      });
    });
  }

  public restart(): Promise<number> {
    return new Promise( (resolve,reject) => {
      return this.stop().then(oldPid => {
        let intervalId = setInterval(() => {
          if(!fs.existsSync(this.pidFilePath)) {
            setTimeout(() => {
              let newPid = this.start();
              clearInterval(intervalId);
              resolve(newPid);
            },1)
          }
        },1)
      });
    });
  }
}