import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ChatResolver } from './chat-resolver.service';
import { ChatComponent } from './chat.component';


const routes: Routes = [
    {
        path: '',
        component: ChatComponent,
        // resolve: {
        //     chat: ChatResolver
        // }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule { }
