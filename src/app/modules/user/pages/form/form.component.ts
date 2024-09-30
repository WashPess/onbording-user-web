import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public userForm = new FormGroup({});

  public changesUserForm(userForm: FormGroup) {
    this.userForm = userForm;
  }

}

