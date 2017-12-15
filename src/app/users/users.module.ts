import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { USERS_ROUTES } from './users.routes';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(USERS_ROUTES)],
  declarations: [RegisterComponent, LoginComponent],
})
export class UsersModule {}
