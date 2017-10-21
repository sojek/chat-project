import { Component } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction
} from "angularfire2/database";

import "rxjs/add/operator/merge";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/reduce";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/do";
import "rxjs/observable/from";
import "rxjs/add/observable/from";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  template: `
  <ul>
    <li class="message" *ngFor="let item of items | async">
      <div class="timestamp">{{ item.timestamp }}</div>
      <div class="from">{{ item.from }}</div>
      <div class="content" [innerHTML]="item.text"></div>
      <div *ngFor="let image of item.images">
        <img src="{{image}}" width="50" height="50">
      </div>
    </li>
  </ul>
  <app-messageform></app-messageform>
  <ul *ngFor="let item of recent | async">
    <li>
    <img src="{{item}}" width="50" height="50">
    </li>
  </ul>
  `,
  styles: [
    `
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    .message {
      position: relative;
      border: 1px solid #ababab;
      border-radius: 10px;
      background: #e8e8e8;
      padding: 0.5em;
      margin-bottom: 0.5em;
    }

    .from {
      font-size: 8px;
    }
    .timestamp {
      position: absolute;
      right: 16px;
      top: 0;
      font-size: 11px;
    }
  `
  ]
})
export class AppComponent {
  items;
  recent;
  constructor(db: AngularFireDatabase) {
    this.items = db
      .list("messages")
      .valueChanges()
      .map(e => e.sort(this.sortByTimestamp));

    this.recent = this.items.map(e => {
      const temp = e.reduce((acc, val, i) => {
        return [...acc, ...(val.images || [])];
      }, []);
      return temp.slice(temp.length - 5, temp.length);
    });
  }

  sortByTimestamp(a, b) {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0;
  }
}
