import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';

import { UserProfile } from '../models';

describe('User profile service tests', () => {
  let userProfileService: UserProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService]
    });

    userProfileService = TestBed.get(UserProfileService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#constructor test', () => {
    const mockResponse: UserProfile = {
      userGroupId: 1,
      userGroup: 'ss',
      userId: 'ss'
    };

    it('should request for an UserProfile', () => {
      userProfileService.getUserProfile().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });
      const request = httpMock.expectOne('/api/v1/profile');
      expect(request.request.method).toBe('GET');
      request.flush(mockResponse);
    });

    it('should not request for an UserProfile when profile is already in the service', () => {
      userProfileService.getUserProfile().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });
      const firstRequest = httpMock.expectOne('/api/v1/profile');
      expect(firstRequest.request.method).toBe('GET');
      firstRequest.flush(mockResponse);

      userProfileService.getUserProfile().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const secondRequest = httpMock.expectNone('/api/v1/profile');
    });
  });
});
