import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycResolver } from './kyc-resolver.service';
import { KycComponent } from './kyc.component';


const routes: Routes = [
    {
        path: ':username',
        component: KycComponent,
        resolve: {
            kyc: KycResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KycRoutingModule { }
