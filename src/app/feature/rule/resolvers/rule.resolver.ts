import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from '../models/rule.model';
import { RuleService } from '../../../shared/shared-rules/services';

@Injectable()
export class RuleResolver implements Resolve<Rule> {
  constructor(private ruleService: RuleService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Rule> | Promise<Rule> | Rule {
    return this.ruleService.getRuleDetails(Number(route.params.id));
  }
}
