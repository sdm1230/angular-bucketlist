import { Component, OnInit } from '@angular/core';
import { Bucketlist } from '../bucketlist';
import { BucketlistService } from '../bucketlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  bucketlists: Bucketlist[] = [];

  constructor(private bucketlistService: BucketlistService) { }

  ngOnInit() {
    this.getBucketlists();
  }

  getBucketlists(): void {
    this.bucketlistService.getBucketlists()
      .subscribe(bucketlists => this.bucketlists = bucketlists.slice(1, 5));
  }
}
