import { Component, OnInit, Input } from '@angular/core';
import { Bucketlist } from '../bucketlist';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BucketlistService }  from '../bucketlist.service';
@Component({
  selector: 'app-bucketlist-detail',
  templateUrl: './bucketlist-detail.component.html',
  styleUrls: ['./bucketlist-detail.component.css']
})
export class BucketlistDetailComponent implements OnInit {
  @Input() bucketlist: Bucketlist;

  constructor(
    private route: ActivatedRoute,
    private bucketlistService: BucketlistService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBucketlist();
  }

  getBucketlist(): void {
  const age = +this.route.snapshot.paramMap.get('age');
  this.bucketlistService.getBucketlist(age)
    .subscribe(bucketlist => this.bucketlist = bucketlist);
  }

  goBack(): void {
  this.location.back();
  }

  save(): void {
   this.bucketlistService.updateBucketlist(this.bucketlist)
     .subscribe(() => this.goBack());
  }

}
