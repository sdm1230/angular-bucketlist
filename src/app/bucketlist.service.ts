import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Bucketlist } from './bucketlist';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BucketlistService {

  private bucketlistsUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getBucketlists(): Observable<Bucketlist[]> {
    return this.http.get<Bucketlist[]>(this.bucketlistsUrl)
      .pipe(
        tap(_ => this.log('fetched bucketlists')),
        catchError(this.handleError<Bucketlist[]>('getBucketlists', []))
      );
  }
    /** Log a HeroService message with the MessageService */
  getBucketlistNo404<Data>(age: number): Observable<Bucketlist> {
    const url = `${this.bucketlistsUrl}/?age=${age}`;
    return this.http.get<Bucketlist[]>(url)
      .pipe(
        map(bucketlists => bucketlists[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} bucketlist age=${age}`);
        }),
        catchError(this.handleError<Bucketlist>(`getBucketlist age=${age}`))
      );
  }

  getBucketlist(age: number): Observable<Bucketlist> {
    const url = `${this.bucketlistsUrl}/${age}`;
    return this.http.get<Bucketlist>(url).pipe(
      tap(_ => this.log(`fetched bucketlist age=${age}`)),
      catchError(this.handleError<Bucketlist>(`getBucketlist age=${age}`))
    );
  }

  searchBucketlists(term: string): Observable<Bucketlist[]> {
    if (!term.trim()) {
  // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Bucketlist[]>(`${this.bucketlistsUrl}/?wish=${term}`).pipe(
      tap(_ => this.log(`found bucketlists matching "${term}"`)),
      catchError(this.handleError<Bucketlist[]>('searchBucketlists', []))
    );
  }

  addBucketlist (bucketlist: Bucketlist): Observable<Bucketlist> {
    return this.http.post<Bucketlist>(this.bucketlistsUrl, bucketlist, this.httpOptions).pipe(
      tap((newBucketlist: Bucketlist) => this.log(`added bucketlist w/ age=${newBucketlist.age}`)),
      catchError(this.handleError<Bucketlist>('addBucketlist'))
    );
  }

  deleteBucketlist (bucketlist: Bucketlist | number): Observable<Bucketlist> {
    const age = typeof bucketlist === 'number' ? bucketlist : bucketlist.age;
    const url = `${this.bucketlistsUrl}/${age}`;

    return this.http.delete<Bucketlist>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted bucketlist age=${age}`)),
      catchError(this.handleError<Bucketlist>('deleteBucketlist'))
    );
  }

  updateBucketlist (bucketlist: Bucketlist): Observable<any> {
    return this.http.put(this.bucketlistsUrl, bucketlist, this.httpOptions).pipe(
      tap(_ => this.log(`updated bucketlist age=${bucketlist.age}`)),
      catchError(this.handleError<any>('updateBucketlist'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
  
  private log(message: string) {
    this.messageService.add(`BucketlistService: ${message}`);
  }
}
