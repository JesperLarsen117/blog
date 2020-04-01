import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// contentful
import { ContentfulService } from './contentful.service';
import { BlogComponent } from './blog/blog.component';
import { FrontComponent } from './front/front.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    FrontComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  providers: [ContentfulService],
  bootstrap: [AppComponent]
})
export class AppModule { }
