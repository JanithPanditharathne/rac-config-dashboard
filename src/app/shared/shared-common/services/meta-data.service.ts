import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { retry } from 'rxjs/operators';

import { DropDownDataItem } from '../models';
import { ChannelData, PageData, PlaceholderData } from '../../shared-rec/models';

import { environment } from '../../../../environments/environment';


/**
 * Class representing meta data service.
 * @Class MetaDataService
 */
@Injectable()
export class MetaDataService {
  private static get_channel_meta_url = '/v1/metadata/channels';
  private static get_page_meta_url = '/v1/metadata/pages';
  private static get_placeholder_meta_url = '/v1/metadata/placeholders';

  private static retry_count = 2;

  public readonly channels = new ReplaySubject<DropDownDataItem[]>(1);
  public readonly pages = new ReplaySubject<DropDownDataItem[]>(1);
  public readonly placeholders = new ReplaySubject<DropDownDataItem[]>(1);

  constructor(private http: HttpClient) {
    this.fetchChannels();
    this.fetchPages();
    this.fetchPlaceholders();
  }

  public fetchChannels(): void {
    this.http
      .get<ChannelData>(`${environment.baseUrl}${MetaDataService.get_channel_meta_url}`)
      .pipe(
        retry(MetaDataService.retry_count)
      )
      .subscribe((data: ChannelData) => {
        this.channels.next(data.channels);
      });
  }

  public fetchPages(): void {
    this.http
      .get<PageData>(`${environment.baseUrl}${MetaDataService.get_page_meta_url}`)
      .pipe(
        retry(MetaDataService.retry_count)
      )
      .subscribe((data: PageData) => {
        this.pages.next(data.pages);
      });
  }

  public fetchPlaceholders(): void {
    this.http
      .get<PlaceholderData>(`${environment.baseUrl}${MetaDataService.get_placeholder_meta_url}`)
      .pipe(
        retry(MetaDataService.retry_count)
      )
      .subscribe((data: PlaceholderData) => {
        this.placeholders.next(data.placeholders);
      });
  }
}
