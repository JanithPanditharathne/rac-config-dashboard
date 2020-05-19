import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../../core/models';
import { DisplayBundle } from '../../../feature/bundle/models/display-bundle.model';
import { Bundle } from '../../../feature/bundle/models/bundle.model';
import { environment } from '../../../../environments/environment';

/**
 * Class representing bundle service.
 * @class BundleService.
 */
@Injectable()
export class BundleService {
  private static bundles_url = '/v1/bundles';

  constructor(private http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the bundles.
   * @returns {Observable<DisplayBundle[]>} - bundles array.
   */
  public getBundles(): Observable<DisplayBundle> {
    return this.http.get<DisplayBundle>(`${environment.baseUrl}${BundleService.bundles_url}`);
  }

  /**
   * Responsible for making a GET call to get bundle details.
   * @param {string} bundleId Bundle id
   * @returns {Observable<Bundle>} Bundle details.
   */
  public getBundleDetails(bundleId: number): Observable<Bundle> {
    return this.http.get<Bundle>(`${environment.baseUrl}${BundleService.bundles_url}/${bundleId}`);
  }

  /**
   * Responsible foe making a POST call to create new bundle.
   * @param {Bundle} bundle Bundle details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createBundle(bundle: Bundle) {
    return this.http.post<SuccessResponse>(`${environment.baseUrl}${BundleService.bundles_url}`, bundle);
  }

  /**
   * Responsible foe making a POST call to edit bundle.
   * @param {Bundle} bundle Bundle details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateBundle(bundle: Bundle) {
    return this.http.put<SuccessResponse>(`${environment.baseUrl}${BundleService.bundles_url}/${bundle.id}`, bundle);
  }

  /**
   * Responsible for making a DELETE call to delete a selected bundle.
   * @param {string} bundleId - Bundle id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteBundle(bundleId: string) {
    return this.http.delete<SuccessResponse>(`${environment.baseUrl}${BundleService.bundles_url}/${bundleId}`);
  }
}
