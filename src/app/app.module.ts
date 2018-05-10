import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { MarketDataModule } from './market-data/market-data.module';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from './core/core.module';


@NgModule({
    declarations: [
        AppComponent, FooterComponent, HeaderComponent
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
        ChartsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
