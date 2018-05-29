import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import {
    FooterComponent,
    HeaderComponent,
    SharedModule
} from './shared';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from './core/core.module';
// import { CreateAdvComponent } from './create-adv/create-adv.component';



@NgModule({
    declarations: [
        AppComponent, FooterComponent, HeaderComponent, 
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
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
