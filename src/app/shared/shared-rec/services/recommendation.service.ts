import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SuccessResponse } from '../../../core/models';
import { DisplayRecommendation, Recommendation } from '../../../feature/recommendation/models';

import { environment } from '../../../../environments/environment';

/**
 * Class representing rec service.
 * @class RecommendationService.
 */
@Injectable()
export class RecommendationService {
  private static recs_url = '/v1/recs';

  constructor(private http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the recs.
   * @returns {Observable<DisplayRecommendation[]>} - recommendations array.
   */
  public getRecs(): Observable<DisplayRecommendation> {
    return this.http.get<DisplayRecommendation>(`${environment.baseUrl}${RecommendationService.recs_url}`);
  }

  /**
   * Responsible for making a GET call to get rec details.
   * @param {string} recId Recommendation id
   * @returns {Observable<Recommendation>} Rec details.
   */
  public getRecDetails(recId: number): Observable<Recommendation> {
    return this.http.get<Recommendation>(`${environment.baseUrl}${RecommendationService.recs_url}/${recId}`);
  }

  /**
   * Responsible for making a POST call to create new rec.
   * @param {Recommendation} rec Recommendation details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createRec(rec: Recommendation) {
    return this.http.post<SuccessResponse>(`${environment.baseUrl}${RecommendationService.recs_url}`, rec);
  }

  /**
   * Responsible for making a POST call to edit rec.
   * @param {Recommendation} rec Recommendation details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateRec(rec: Recommendation) {
    return this.http.put<SuccessResponse>(`${environment.baseUrl}${RecommendationService.recs_url}/${rec.id}`, rec);
  }

  /**
   * Responsible for making a DELETE call to delete a selected rec.
   * @param {string} recId - Rec id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteRec(recId: string) {
    return this.http.delete<SuccessResponse>(`${environment.baseUrl}${RecommendationService.recs_url}/${recId}`);
  }
}
