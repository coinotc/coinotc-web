import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ChatComponent } from './chat.component';
// import { ChatResolver } from './chat-resolver.service';
import { SharedModule } from '../shared';
import { ChatRoutingModule } from './chat-routing.module';


@NgModule({
    imports: [
        SharedModule,
        ChatRoutingModule,
        ClarityModule
    ],
    declarations: [
        ChatComponent
    ],
    providers: [
        // ChatResolver
    ]
})
export class ChatModule { }
