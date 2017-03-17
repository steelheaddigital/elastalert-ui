import 'mocha'
import { expect } from 'chai'
import { NextFunction } from 'express';
import * as Mockito from 'ts-mockito';
import { ElastalertService } from './elastalert_service';
import { ElastalertController } from './elastalert_controller';


describe('Elastalert Controller', () => {
  describe('stop method', () => {
    it('calls service stop method', function(done) {
      let elastalertService = Mockito.mock(ElastalertService);

      Mockito.when(elastalertService.stop()).thenReturn(new Promise<number>((resolve, reject) => {
        resolve(123);
      }));

      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(123);
          done();
        }
      }};

      let elastalertController = new ElastalertController(Mockito.instance(elastalertService));

      elastalertController.stop(req, res, next);
      Mockito.verify(elastalertService.stop()).atLeast(1);
    });
  });

  describe('start method', function() {
    it('calls service start method', function(done) {
      let elastalertService = Mockito.mock(ElastalertService);

      
      Mockito.when(elastalertService.start()).thenReturn(123);
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(123);
          done();
        }
      }};

      let elastalertController = new ElastalertController(Mockito.instance(elastalertService));

      elastalertController.start(req, res, next);
      Mockito.verify(elastalertService.start()).atLeast(1);
    });
  });

  describe('restart method', () => {
    it('calls service restart method', function(done) {
      let elastalertService = Mockito.mock(ElastalertService);

      Mockito.when(elastalertService.restart()).thenReturn(new Promise((resolve, reject) => {
        resolve(123);
      }));
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(123);
          done();
        }
      }};

      let elastalertController = new ElastalertController(Mockito.instance(elastalertService));

      elastalertController.restart(req, res, next);
      Mockito.verify(elastalertService.restart()).atLeast(1);
    });
  });

  describe('status method', () => {
    it('calls service status method', function(done) {
      let elastalertService = Mockito.mock(ElastalertService);

      Mockito.when(elastalertService.status()).thenReturn(
        new Promise((resolve, reject) => {
          resolve(true);
        }));
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(true);
          done();
        }
      }};

      let elastalertController = new ElastalertController(Mockito.instance(elastalertService));

      elastalertController.status(req, res, next);
      Mockito.verify(elastalertService.status()).atLeast(1);
    });
  });
})