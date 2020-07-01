import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { Rule } from '../models';

import { RuleService } from '../../../shared/shared-rules/services';

/**
 * Class representing rule resolver.
 * @class RuleResolver
 */
@Injectable()
export class RuleResolver implements Resolve<Rule> {
  constructor(private readonly ruleService: RuleService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Rule> | Promise<Rule> | Rule {
    return this.ruleService.getRuleDetails(Number(route.params.id));
  }
}
