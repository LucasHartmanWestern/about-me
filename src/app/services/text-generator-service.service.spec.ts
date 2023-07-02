import { TestBed } from '@angular/core/testing';

import { TextGeneratorServiceService } from './text-generator-service.service';

describe('TextGeneratorServiceService', () => {
  let service: TextGeneratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextGeneratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
