import { AlertifyService } from './../services/alertify.service';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<MemberEditComponent> {
  constructor(private alertifyService: AlertifyService) {}

  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? All your unsaved changes will be lost.'
      );
    }
    return true;
  }
}
