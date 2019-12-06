import { Component, OnInit } from '@angular/core';
import { Bucketlist } from '../bucketlist';
import { BucketlistService } from '../bucketlist.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  bucketlists : Bucketlist[];

  constructor(private bucketlistService: BucketlistService) { }

  ngOnInit() {
    this.getBucketlists();
  }

  getBucketlists(): void {
    this.bucketlistService.getBucketlists()
      .subscribe(bucketlists => this.bucketlists = bucketlists);
  }

  add(wish: string): void {
  wish = wish.trim();
  if (!wish) { return; }
  this.bucketlistService.addBucketlist({ wish } as Bucketlist)
    .subscribe(bucketlist => {
      this.bucketlists.push(bucketlist);
    });
  }

  delete(bucketlist: Bucketlist): void {
    this.bucketlists = this.bucketlists.filter(h => h !== bucketlist);
    this.bucketlistService.deleteBucketlist(bucketlist).subscribe();
  }

}
