import { Injectable } from '@angular/core';
// contentful
import { createClient, Entry } from 'contentful';


@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  CONFIG = {
    space: '88lbbvk6lpib',
    accessToken: 'YtFE3wwwmJ5K8o3mfU4KjhWOrjuRJhKS7bo6jo5lKTQ',
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
