import { Component, OnInit, ViewChild } from '@angular/core';

import { ContentfulService } from '../contentful.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Entry } from 'contentful';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  // define private class properties
  products: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulService) {
  }
  // fetch data on init
  ngOnInit() {
    setInterval(() => {
      const articles = document.getElementsByClassName("preview_article") as unknown as HTMLCollectionOf<HTMLElement>;
      for (const article of Array.from(articles)) {
        if (isInViewport(article)) {
          article.setAttribute('class', 'animated content preview_article');
        }
      }
    }, 500);
    // tslint:disable-next-line: only-arrow-functions
    const isInViewport = function (elem) {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight + 1000 || document.documentElement.clientHeight + 1000) &&
        bounding.right <= (window.innerWidth + 1000 || document.documentElement.clientWidth + 1000)
      );
    };
    this.contentfulService.getProducts()
      .then(products => {
        this.products = products;
        console.log(this.products);
      });
  }
  _returnHtmlFromRichText(richText) {
    if (richText === undefined || richText === null || richText.nodeType !== 'document') {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText);
  }
  _returnCreatedDate(datetime) {
    if (datetime === undefined || datetime === null) {
      return '<p>Error</p>';
    }
    const e = new Date(datetime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return e.toLocaleDateString('da-DK', options);
  }

}
