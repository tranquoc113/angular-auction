import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {PageHomeComponent} from './page-share/page-home/page-home.component';
import {TranslateDescriptionComponent} from './yahoo-auction/yahoo-aution-detail/translate-description/translate-description.component';
import {TranslateRankingComponent} from './yahoo-auction/yahoo-aution-detail/translate-ranking/translate-ranking.component';
import {RakutenTranslateDescriptionComponent} from './rakuten/ratuken-detail-product/rakuten-translate-description/rakuten-translate-description.component';
import {SignInComponent} from './account/sign-in/sign-in.component';
import {SignUpComponent} from './account/sign-up/sign-up.component';
import {PersonSettingComponent} from './account/person-setting/person-setting.component';
import {AuthGuard} from '../core/guard/auth.guard';

const pageRoutes: Routes = [
  {path: 'yahoo-auction/detail/description/translate/:id', component: TranslateDescriptionComponent},
  {path: 'yahoo-auction/detail/ranking/translate/:id', component: TranslateRankingComponent},
  {path: 'rakuten/detail/description/translate/:id', component:     RakutenTranslateDescriptionComponent},
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        children: [
          {path: '', component: PageHomeComponent},
          {path: 'sign-in', component: SignInComponent},
          {path: 'sign-up', component: SignUpComponent},
          {path: 'person-setting', component: PersonSettingComponent, canActivate: [AuthGuard]},
          {path: 'rakuten',   loadChildren: () => import('./rakuten/rakuten.module').then(mod => mod.RakutenModule) },
          {path: 'yahoo-auction',   loadChildren: () => import('./yahoo-auction/yahoo-auction.module').then(mod => mod.YahooAuctionModule) },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
