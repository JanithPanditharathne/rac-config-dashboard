import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../../core/models';
import { Recommendation } from '../models/recommendation.model';
import { DisplayRecommendation } from '../models/display-recommendation.model';
import { Injectable } from '@angular/core';
import { RecommendationSave } from '../models/recommendation-save.model';

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
   * @returns {Observable<DisplayRecommendation[]>} - algorithms array.
   */
  public getRecs(): Observable<DisplayRecommendation> {
    return this.http.get<DisplayRecommendation>(`${RecommendationService.recs_url}`);
  }

  /**
   * Responsible for making a GET call to get rec details.
   * @param {string} recId Recommendation id
   * @returns {Observable<Recommendation>} Rec details.
   */
  public getRecDetails(recId: number): Observable<Recommendation> {
    return this.http.get<Recommendation>(`${RecommendationService.recs_url}/${recId}`);
  }

  /**
   * Responsible for making a POST call to create new rec.
   * @param {RecommendationSave} rec Recommendation details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createRec(rec: RecommendationSave) {
    return this.http.post<SuccessResponse>(`${RecommendationService.recs_url}`, rec);
  }

  /**
   * Responsible for making a POST call to edit rec.
   * @param {RecommendationSave} rec Recommendation details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateRec(rec: RecommendationSave) {
    return this.http.put<SuccessResponse>(`${RecommendationService.recs_url}/${rec.recId}`, rec);
  }

  /**
   * Responsible for making a DELETE call to delete a selected rec.
   * @param {string} recId - Rec id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteRec(recId: string) {
    return this.http.delete<SuccessResponse>(`${RecommendationService.recs_url}/${recId}`);
  }
}
