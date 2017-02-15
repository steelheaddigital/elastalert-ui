import 'mocha'
import { expect } from 'chai'
import { NextFunction } from 'express';
import * as TypeMoq from 'typemoq';
import { ElastalertService } from './elastalert_service';
import { ElastalertController } from './elastalert_controller';


describe('Elastalert Controller', () => {
  describe('stop method', () => {
    it('calls service stop method', function(done) {
      let elastalertService = TypeMoq.Mock.ofType<ElastalertService>();

      elastalertService.setup(x => x.stop()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(123);
        });
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(123);
          done();
        }
      }};

      let elastalertController = new ElastalertController(elastalertService.object);

      elastalertController.stop(req, res, next);
      elastalertService.verify(x => x.stop(), TypeMoq.Times.atLeastOnce())
    });
  });

  describe('start method', function() {
    it('calls service start method', function(done) {
      let elastalertService = TypeMoq.Mock.ofType<ElastalertService>();

      elastalertService.setup(x => x.start()).returns(() => { 
        return 123 
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(123);
          done();
        }
      }};

      let elastalertController = new ElastalertController(elastalertService.object);

      elastalertController.start(req, res, next);
      elastalertService.verify(x => x.start(), TypeMoq.Times.atLeastOnce())
    });
  });

  describe('restart method', () => {
    it('calls service restart method', function(done) {
      let elastalertService = TypeMoq.Mock.ofType<ElastalertService>();

      elastalertService.setup(x => x.restart()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(123);
        });
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(123);
          done();
        }
      }};

      let elastalertController = new ElastalertController(elastalertService.object);

      elastalertController.restart(req, res, next);
      elastalertService.verify(x => x.restart(), TypeMoq.Times.atLeastOnce())
    });
  });

  describe('status method', () => {
    it('calls service status method', function(done) {
      let elastalertService = TypeMoq.Mock.ofType<ElastalertService>();

      elastalertService.setup(x => x.status()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(true);
          done();
        }
      }};

      let elastalertController = new ElastalertController(elastalertService.object);

      elastalertController.status(req, res, next);
      elastalertService.verify(x => x.status(), TypeMoq.Times.atLeastOnce())
    });
  });
})