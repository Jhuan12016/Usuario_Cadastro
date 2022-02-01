import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [UsuariosComponent],

  imports: [CommonModule, UsuariosRoutingModule, ButtonModule,GridModule,TextBoxAllModule,DialogModule,ReactiveFormsModule,FormsModule,DatePickerModule],
})
export class UsuariosModule {}
