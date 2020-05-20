import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../../core/models';
import { Bundle } from '../../../feature/bundle/models/bundle.model';
import { environment } from '../../../../environments/environment';
import { Rule } from '../../../feature/rule/models/rule.model';
import { DisplayRule } from '../../../feature/rule/models/display-rule.model';

/**
 * Class representing rule service.
 * @class RuleService.
 */
@Injectable()
export class RuleService {
  private static rules_url = '/v1/rules';

  constructor(private http: HttpClient) {
  }

  /**
   * Responsible for making a GET api call to get all the rules.
   * @returns {Observable<DisplayRule>} - rules array.
   */
  public getRules(): Observable<DisplayRule> {
    return this.http.get<DisplayRule>(`${environment.baseUrl}${RuleService.rules_url}`);
  }

  /**
   * Responsible for making a GET call to get rule details.
   * @param {string} ruleId rule id
   * @returns {Observable<Rule>} rule details.
   */
  public getRuleDetails(ruleId: number): Observable<Rule> {
    return this.http.get<Rule>(`${environment.baseUrl}${RuleService.rules_url}/${ruleId}`);
  }

  /**
   * Responsible foe making a POST call to create new rule.
   * @param {Rule} rule Rule details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public createRule(rule: Rule) {
    return this.http.post<SuccessResponse>(`${environment.baseUrl}${RuleService.rules_url}`, rule);
  }

  /**
   * Responsible foe making a POST call to edit rule.
   * @param {Rule} rule Rule details.
   * @returns {Observable<SuccessResponse>} Response.
   */
  public updateRule(rule: Rule) {
    return this.http.put<SuccessResponse>(`${environment.baseUrl}${RuleService.rules_url}/${rule.id}`, rule);
  }

  /**
   * Responsible for making a DELETE call to delete a selected rule.
   * @param {string} ruleId - Rule id
   * @returns {Observable<SuccessResponse>} Response
   */
  public deleteRule(ruleId: string) {
    return this.http.delete<SuccessResponse>(`${environment.baseUrl}${RuleService.rules_url}/${ruleId}`);
  }
}
