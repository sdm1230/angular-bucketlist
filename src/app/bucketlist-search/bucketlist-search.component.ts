import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Bucketlist } from '../bucketlist';
import { BucketlistService } from '../bucketlist.service';

@Component({
  selector: 'app-bucketlist-search',
  templateUrl: './bucketlist-search.component.html',
  styleUrls: ['./bucketlist-search.component.css']
})

export class BucketlistSearchComponent implements OnInit {
  bucketlists$: Observable<Bucketlist[]>;
  private searchTerms = new Subject<string>();

  constructor(private bucketlistService: BucketlistService) {}

    // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
      this.bucketlists$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
      debounceTime(300),
        // ignore new term if same as previous term
      distinctUntilChanged(),
        // switch to new search observable each time the term changes
      switchMap((term: string) => this.bucketlistService.searchBucketlists(term)),
    );
  }
}
