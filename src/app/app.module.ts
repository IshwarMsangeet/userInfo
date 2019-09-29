import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule }  from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListOption } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
// import { WizardComponent } from './wizard/wizard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { UserComponent } from './user/user.component';
import { CustomInterceptorService } from './custom-interceptor.service';
const appRoutes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[MatInputModule, MatSelectModule, MatIconModule,
          MatButtonModule, MatListModule, MatTabsModule, MatTableModule,
          MatDividerModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
