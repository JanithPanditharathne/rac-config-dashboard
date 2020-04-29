// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
//
// import { ClientErrorInterceptorService } from './client-error-interceptor.service';
//
// import { GlobalRefService } from 'ornamentum';
//
// const MockGlobalRefService = {
//   console: {
//     error: () => {
//     },
//     log: () => {
//     }
//   },
//   window: {
//     document: {
//       getElementById: () => {
//         return document.createElement('button');
//       }
//     }
//   }
// };
//
// describe('ClientErrorInterceptorService tests', () => {
//   let httpMock: HttpTestingController;
//   let globalRefService: GlobalRefService;
//   let clientErrorInterceptorService: ClientErrorInterceptorService;
//
//   beforeEach(() => {
//
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         ClientErrorInterceptorService,
//         {provide: GlobalRefService, useValue: MockGlobalRefService}
//       ],
//     });
//     clientErrorInterceptorService = TestBed.get(ClientErrorInterceptorService);
//     httpMock = TestBed.get(HttpTestingController);
//     globalRefService = TestBed.get(GlobalRefService);
//
//
//   });
//
//   afterEach(() => {
//     httpMock.verify();
//   });
//
//   describe('#handleError tests', () => {
//
//     spyOn(globalRefService, 'console');
//     // createSpyObj('console', ['log', 'error']);
//     it('', () => {
//       clientErrorInterceptorService.handleError(new Error('Test error'));
//       expect(globalRefService.console.error).toHaveBeenCalledWith(new Error('Test error'));
//     });
//   });
// });
