import { Component, EventEmitter, Input, Output } from "@angular/core";
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

  submitForm() {
    this.db.list("messages").push(this.form.value);
  }
}
