import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Entry } from 'contentful';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { ContentfulService } from '../contentful.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  // define private class properties
  products: Entry<any>[] = [];
  id: any;

  constructor(private contentfulService: ContentfulService, private route: ActivatedRoute) { }

  // fetch data on init
  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.contentfulService.getProducts()
      .then(products => this.products = products);
  }
  _returnHtmlFromRichText(richText) {
    const breaks = document.querySelectorAll('.article_content p') as unknown as HTMLCollectionOf<HTMLElement>;
    console.log(Array.from(breaks));
    for (const item of Array.from(breaks)) {
      item.style.marginBottom = '2em';
    }

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
