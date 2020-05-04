import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Algorithm } from '../../../feature/algorithm/models/algorithm.model';
import { DisplayAlgorithm } from '../../../feature/algorithm/models/display-algorithm.model';
import { SuccessResponse } from '../../../core/models';

/**
 * Class representing algorithms service.
 * @class AlgorithmService.
 */
@Injectable()
export class AlgorithmService {
  private static algorithms_url = '/v1/algorithms';

  constructor(private http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the algorithms.
   * @returns {Observable<Algorithm[]>} - algorithms array.
   */
  public getAlgorithms(): Observable<DisplayAlgorithm> {
    return this.http.get<DisplayAlgorithm>(`${AlgorithmService.algorithms_url}`);
  }

  /**
   * Responsible for making a GET call to get algorithm details.
   * @param {string} algorithmId Algorithm id
   * @returns {Observable<Algorithm>} Bundle details.
   */
  public getAlgorithmDetails(algorithmId: number): Observable<Algorithm> {
    return this.http.get<Algorithm>(`${AlgorithmService.algorithms_url}/${algorithmId}`);
  }

  /**
   * Responsible foe making a POST call to create new algorithm.
   * @param {Algorithm} algorithm Algorithm details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createAlgorithm(algorithm: Algorithm) {
    return this.http.post<SuccessResponse>(`${AlgorithmService.algorithms_url}`, algorithm);
  }

  /**
   * Responsible foe making a POST call to edit algorithm.
   * @param {Algorithm} algorithm Algorithm details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateAlgorithm(algorithm: Algorithm) {
    return this.http.put<SuccessResponse>(`${AlgorithmService.algorithms_url}`, algorithm);
  }

  /**
   * Responsible for making a DELETE call to delete a selected algorithm.
   * @param {string} algorithmId - Algorithm id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteAlgorithm(algorithmId: string) {
    return this.http.delete<SuccessResponse>(`${AlgorithmService.algorithms_url}/${algorithmId}`);
  }
}
