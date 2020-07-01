import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { retry } from 'rxjs/operators';

import { DropDownDataItem } from '../models';
import { MetaData } from '../../shared-rec/models';

import { RuleUtilityService } from '../../shared-rules/services';

import { environment } from '../../../../environments/environment';


/**
 * Class representing meta data service.
 * @Class MetaDataService
 */
@Injectable()
export class MetaDataService {
  private static readonly getChannelMetaUrl = '/v1/metadata/channels';
  private static readonly getPageMetaUrl = '/v1/metadata/pages';
  private static readonly getPlaceholderMetaUrl = '/v1/metadata/placeholders';
  private static readonly getBrandMetaUrl = '/v1/metadata/brands';
  private static readonly getMetadataTypesMetaUrl = '/v1/metadata/types';
  private static readonly getMetadataValuesUrl = '/v1/metadata';

  private static readonly retryCount = 2;

  public readonly channels = new ReplaySubject<DropDownDataItem[]>(1);
  public readonly pages = new ReplaySubject<DropDownDataItem[]>(1);
  public readonly placeholders = new ReplaySubject<DropDownDataItem[]>(1);
  public readonly brands = new ReplaySubject<DropDownDataItem[]>(1);
  public readonly metadataTypes = new ReplaySubject<string[]>(1);

  constructor(
    private readonly http: HttpClient,
    private readonly ruleUtilityService: RuleUtilityService
  ) {
    this.fetchChannels();
    this.fetchPages();
    this.fetchPlaceholders();
    this.fetchBrands();
    this.fetchTypes();
  }

  public fetchChannels(): void {
    this.http
      .get<MetaData>(`${environment.baseUrl}${MetaDataService.getChannelMetaUrl}`)
      .pipe(
        retry(MetaDataService.retryCount)
      )
      .subscribe((data: MetaData) => {
        this.channels.next(data.metadata);
      });
  }

  public fetchPages(): void {
    this.http
      .get<MetaData>(`${environment.baseUrl}${MetaDataService.getPageMetaUrl}`)
      .pipe(
        retry(MetaDataService.retryCount)
      )
      .subscribe((data: MetaData) => {
        this.pages.next(data.metadata);
      });
  }

  public fetchPlaceholders(): void {
    this.http
      .get<MetaData>(`${environment.baseUrl}${MetaDataService.getPlaceholderMetaUrl}`)
      .pipe(
        retry(MetaDataService.retryCount)
      )
      .subscribe((data: MetaData) => {
        this.placeholders.next(data.metadata);
      });
  }

  private fetchBrands(): void {
    this.http
      .get<MetaData>(`${environment.baseUrl}${MetaDataService.getBrandMetaUrl}`)
      .pipe(
        retry(MetaDataService.retryCount)
      )
      .subscribe((data: MetaData) => {
        this.brands.next(data.metadata);
      });
  }

  private fetchTypes(): void {
    this.http
      .get<string[]>(`${environment.baseUrl}${MetaDataService.getMetadataTypesMetaUrl}`)
      .pipe(
        retry(MetaDataService.retryCount)
      )
      .subscribe((data: string[]) => {
        this.metadataTypes.next(this.ruleUtilityService.filterMetadataTypes(data));
      });
  }

  public getMetaValues(key: string) {
    return this.http.get<MetaData>(`${environment.baseUrl}${MetaDataService.getMetadataValuesUrl}/${key}`);
  }
}
