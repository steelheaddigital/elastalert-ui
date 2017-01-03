import * as fs from 'fs';
const exec = require('child_process').exec;
const config = require('../../../config');


export class ElastalertManager {
  pidFilePath = config.elastalertDir + '/pid';
  
  constructor(){
  }

  public start() {
    let child = exec('python -m elastalert.elastalert --verbose', {
      cwd: config.elastalertDir
    });

    if(child.pid){
      let pidFile = fs.createWriteStream(this.pidFilePath);
      pidFile.write(child.pid.toString());
      pidFile.end();
    }

    child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
      console.log('closing code: ' + code);
      this.removePidFile();
    });
    process.on('SIGTERM', function() {
      this.removePidFile();
    });
    process.on('SIGINT', function() {
      this.removePidFile();
    });
  }

  public stop() {
    fs.readFile(this.pidFilePath, 'utf8', (err,data) => {
      let pid: number = <number><any>data;
      process.kill(pid, 'SIGTERM')
    });
  }

  private removePidFile(){
    fs.unlink(config.elastalertDir + '/pid', function (err) {
        console.log(err);
    });
  }
}