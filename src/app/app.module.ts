import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase-chat';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        //  CreateAdvComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        SharedModule,
        HomeModule,
        AuthModule,
        FormsModule,
        HttpModule,
        ClarityModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        StarRatingModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
