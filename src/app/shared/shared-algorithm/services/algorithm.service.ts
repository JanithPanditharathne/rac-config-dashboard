import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SuccessResponse } from '../../../core/models';
import { Algorithm, DisplayAlgorithm } from '../../../feature/algorithm/models';

import { environment } from '../../../../environments/environment';

/**
 * Class representing algorithms service.
 * @class AlgorithmService.
 */
@Injectable()
export class AlgorithmService {
  private static readonly algorithmsUrl = '/v1/algorithms';

  constructor(private readonly http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the algorithms.
   * @returns {Observable<Algorithm[]>} - algorithms array.
   */
  public getAlgorithms(): Observable<DisplayAlgorithm> {
    return this.http.get<DisplayAlgorithm>(`${environment.baseUrl}${AlgorithmService.algorithmsUrl}`);
  }

  /**
   * Responsible for making a GET call to get algorithm details.
   * @param {string} algorithmId Algorithm id
   * @returns {Observable<Algorithm>} Algorithm details.
   */
  public getAlgorithmDetails(algorithmId: number): Observable<Algorithm> {
    return this.http.get<Algorithm>(`${environment.baseUrl}${AlgorithmService.algorithmsUrl}/${algorithmId}`);
  }

  /**
   * Responsible foe making a POST call to create new algorithm.
   * @param {Algorithm} algorithm Algorithm details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createAlgorithm(algorithm: Algorithm) {
    return this.http.post<SuccessResponse>(`${environment.baseUrl}${AlgorithmService.algorithmsUrl}`, algorithm);
  }

  /**
   * Responsible foe making a POST call to edit algorithm.
   * @param {Algorithm} algorithm Algorithm details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateAlgorithm(algorithm: Algorithm) {
    return this.http.put<SuccessResponse>(`${environment.baseUrl}${AlgorithmService.algorithmsUrl}/${algorithm.id}`, algorithm);
  }

  /**
   * Responsible for making a DELETE call to delete a selected algorithm.
   * @param {string} algorithmId - Algorithm id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteAlgorithm(algorithmId: string) {
    return this.http.delete<SuccessResponse>(`${environment.baseUrl}${AlgorithmService.algorithmsUrl}/${algorithmId}`);
  }
}
