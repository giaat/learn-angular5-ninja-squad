import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormControlValidationDirective } from './form-control-validation.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FormControlValidationDirective],
  exports: [NgbModule, FormControlValidationDirective, NgbModule],
})
export class SharedModule {}
