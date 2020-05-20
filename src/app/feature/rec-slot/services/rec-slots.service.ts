import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../../core/models';
import { Injectable } from '@angular/core';
import { DisplayRecSlots } from '../models/display-rec-slots.model';
import { RecSlot } from '../models/rec-slot.model';
import { RecSlotSave } from '../models/rec-slot-save.model';
import { environment } from '../../../../environments/environment';

/**
 * Class representing rec slots service.
 * @class RecSlotsService.
 */
@Injectable()
export class RecSlotsService {
  private static rec_slots_url = '/v1/recSlots';

  constructor(private http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the rec slots.
   * @returns {Observable<DisplayRecSlots[]>} - rec slots array.
   */
  public getRecSlots(): Observable<DisplayRecSlots> {
    return this.http.get<DisplayRecSlots>(`${environment.baseUrl}${RecSlotsService.rec_slots_url}`);
  }

  /**
   * Responsible for making a GET call to get rec slot details.
   * @param {string} recSlotId Rec slot id
   * @returns {Observable<RecSlot>} Rec slot details.
   */
  public getRecSlotDetails(recSlotId: number): Observable<RecSlot> {
    return this.http.get<RecSlot>(`${environment.baseUrl}${RecSlotsService.rec_slots_url}/${recSlotId}`);
  }

  /**
   * Responsible for making a POST call to create new rec slot.
   * @param {RecSlotSave} recSlot Recommendation slot details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createRecSlot(recSlot: RecSlotSave) {
    return this.http.post<SuccessResponse>(`${environment.baseUrl}${RecSlotsService.rec_slots_url}`, recSlot);
  }

  /**
   * Responsible for making a POST call to edit rec slot.
   * @param {RecSlotSave} recSlot Recommendation slot details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateRecSlot(recSlot: RecSlotSave) {
    return this.http.put<SuccessResponse>(`${environment.baseUrl}${RecSlotsService.rec_slots_url}/${recSlot.recId}`, recSlot);
  }

  /**
   * Responsible for making a DELETE call to delete a selected rec slot.
   * @param {string} recSlotId - Rec slot id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteRecSlot(recSlotId: string) {
    return this.http.delete<SuccessResponse>(`${environment.baseUrl}${RecSlotsService.rec_slots_url}/${recSlotId}`);
  }
}
