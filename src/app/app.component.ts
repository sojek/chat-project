import { Component } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  template: `
  <ul>
    <li class="message" *ngFor="let item of items | async">
      <div class="timestamp">{{ item.timestamp }}</div>
      <div class="from">{{ item.from }}</div>
      <div class="content">{{ item.text }}</div>
    </li>
  </ul>
  <app-messageform></app-messageform>
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
      font-size: 11px;
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
  constructor(db: AngularFireDatabase) {
    this.items = db
      .list("messages")
      .valueChanges()
      .map(e => e.sort(this.sortByTimestamp));
  }

  sortByTimestamp(a, b) {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0;
  }
}
