import { TestBed } from '@angular/core/testing';

import { BucketlistService } from './bucketlist.service';

describe('BucketlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BucketlistService = TestBed.get(BucketlistService);
    expect(service).toBeTruthy();
  });
});
