import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-messageform",
  template: `
    <form>
      from: <input />
      message: <textarea></textarea>
    </form>
  `,
  styleUrls: ["./messageform.component.css"]
})
export class MessageformComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
