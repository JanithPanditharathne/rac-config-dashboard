import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SuccessResponse } from '../../../core/models';
import { DisplayRecSlot, RecSlot } from '../models';

import { environment } from '../../../../environments/environment';

/**
 * Class representing rec slots service.
 * @class RecSlotsService.
 */
@Injectable()
export class RecSlotsService {
  private static readonly recSlotsUrl = '/v1/rec-slots';

  constructor(private readonly http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the rec slots.
   * @returns {Observable<DisplayRecSlot[]>} - rec slots array.
   */
  public getRecSlots(): Observable<DisplayRecSlot> {
    return this.http.get<DisplayRecSlot>(`${environment.baseUrl}${RecSlotsService.recSlotsUrl}`);
  }

  /**
   * Responsible for making a GET call to get rec slot details.
   * @param {string} recSlotId Rec slot id
   * @returns {Observable<RecSlot>} Rec slot details.
   */
  public getRecSlotDetails(recSlotId: number): Observable<RecSlot> {
    return this.http.get<RecSlot>(`${environment.baseUrl}${RecSlotsService.recSlotsUrl}/${recSlotId}`);
  }

  /**
   * Responsible for making a POST call to create new rec slot.
   * @param {RecSlot} recSlot Recommendation slot details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createRecSlot(recSlot: RecSlot) {
    return this.http.post<SuccessResponse>(`${environment.baseUrl}${RecSlotsService.recSlotsUrl}`, recSlot);
  }

  /**
   * Responsible for making a POST call to edit rec slot.
   * @param {RecSlot} recSlot Recommendation slot details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateRecSlot(recSlot: RecSlot) {
    return this.http.put<SuccessResponse>(`${environment.baseUrl}${RecSlotsService.recSlotsUrl}/${recSlot.id}`, recSlot);
  }

  /**
   * Responsible for making a DELETE call to delete a selected rec slot.
   * @param {string} recSlotId - Rec slot id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteRecSlot(recSlotId: string) {
    return this.http.delete<SuccessResponse>(`${environment.baseUrl}${RecSlotsService.recSlotsUrl}/${recSlotId}`);
  }
}
