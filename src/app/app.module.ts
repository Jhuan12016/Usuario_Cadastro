import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DatePickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
