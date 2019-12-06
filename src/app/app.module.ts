import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { BucketlistDetailComponent } from './bucketlist-detail/bucketlist-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { BucketlistSearchComponent } from './bucketlist-search/bucketlist-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    BucketlistDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BucketlistSearchComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
