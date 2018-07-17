import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    {
        path: 'market',
        loadChildren: './market-data/market-data.module#MarketDataModule'
    },
    {
        path: 'orders',
        loadChildren: './order-list/order-list.module#OrderListModule'
    },
    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
    },
    {
        path: 'kyc',
        loadChildren: './kyc/kyc.module#KycModule'
    },
    {
        path: 'advDetail',
        loadChildren: './adv-detail/adv-detail.module#AdvDetailModule'
    },
    {
        path: 'advertisement',
        loadChildren: './create-adv/create-adv.module#CreateAdvModule'
    },
    {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path: 'forgetTradePrd',
        loadChildren: './forget-trade-prd/forget-trade-prd.module#ForgetTradePrdModule'
    },
    {
        path: 'twoFactorAuthentication',
        loadChildren: './two-factor-authentication/two-factor-authentication.module#TwoFactorAuthenticationModule'
    },
    {
        path: 'changeTradePrd',
        loadChildren: './change-trade-prd/change-trade-prd.module#ChangeTradePrdModule'
    },
    {
        path: 'changePassword',
        loadChildren: './change-password/change-password.module#ChangePasswordModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            // preload all modules; optionally we could
            // implement a custom preloading strategy for just some
            // of the modules (PRs welcome 😉)
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
