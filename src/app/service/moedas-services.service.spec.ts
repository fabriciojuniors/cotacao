import { TestBed } from '@angular/core/testing';

import { MoedasServicesService } from './moedas-services.service';

describe('MoedasServicesService', () => {
  let service: MoedasServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoedasServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
