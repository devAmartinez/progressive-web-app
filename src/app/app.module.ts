import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TransferHttpCacheModule} from '@nguniversal/common';

// Para funcionamiento de los formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// DatePicker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// Requerido para las animaciones en angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing del sitio
import { appRoutes } from './app.routing';

// Firebase config
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Componentes propios
import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListCreatorComponent } from './lists/creator/list.creator.component';
import { ListComponent } from './lists/list.component';
import { TodosCreatorComponent } from './todos/creator/todos.creator.component';
import { CardComponent } from './todos/card/todo.card.component';

// Servicios
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth.guard.service';
import { UserService } from './services/users.service';
import { ListService } from './services/lists.service';
import { TodoService } from './services/todos.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCreatorComponent,
    ListComponent,
    TodosCreatorComponent,
    CardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(appRoutes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    ListService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
