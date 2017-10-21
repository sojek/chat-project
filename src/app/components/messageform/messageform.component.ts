import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-messageform",
  template: `
    <form [formGroup]="form" (ngSubmit)="submitForm()">
    from: <input [formControlName]="'from'" />
    message: <textarea  [formControlName]="'text'"></textarea>
    <div>
      <button type="submit" [disabled]="form.invalid">SEND</button>
    </div>

    </form>
  `,
  styleUrls: ["./messageform.component.css"]
})
export class MessageformComponent {
  public form: FormGroup;
  constructor(
    public db: AngularFireDatabase,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      from: ["", Validators.required],
      text: ["", Validators.required]
    });
  }

  ngOnInit() {}

  linkify(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }

  imigify(text) {
    const pattern = /https?:\/\/([a-z0-9-.\/_#\^\?=:\,%@]*)\.(jpg|png|gif|jpeg)\b/gi;
    return text.match(pattern);
  }

  submitForm() {
    this.db.list("messages").push({
      ...this.form.value,
      text: this.linkify(this.form.value.text),
      images: this.imigify(this.form.value.text),
      links: [],
      timestamp: Date.now()
    });
  }
}
