import { Injectable } from '@angular/core';
// contentful
import { createClient, Entry } from 'contentful';


@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  CONFIG = {
    space: '88lbbvk6lpib',
    accessToken: 'CONTENTFUL_KEY',
  };

  private cdaClient = createClient({
    space: this.CONFIG.space,
    accessToken: this.CONFIG.accessToken
  });

  constructor() { }

  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
    }, query))
      .then(res => res.items);
  }

}
