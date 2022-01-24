import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../enums/api';

import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getApiVariables', () => {
    const http = TestBed.inject(HttpClient);
    const httpGetSpy: jasmine.Spy<any> = spyOn(http, 'get').and.returnValue(of(document));

    service.get({api: Api.game, variables: [{value: 'string', key: 'id'}]}).subscribe(test => {
      console.log('test:', test);
    })
    expect(httpGetSpy).toHaveBeenCalled();

    expect(service).toBeTruthy();
  });
});
