import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./componets/home/home.component";
import {LoginComponent} from "./componets/authorization/login/login.component";
import {ErrorComponent} from "./componets/error/error.component";
import {AccountComponent} from "./componets/account/account.component";
import {AboutComponent} from "./componets/about/about.component";
import {ShopComponent} from "./componets/shop/shop.component";
import {LibraryComponent} from "./componets/library/library.component";
import {RegistrationComponent} from "./componets/registration/registration.component";
import {BasketComponent} from "./componets/basket/basket.component";
import {ProfileComponent} from "./componets/account/models/profile/profile.component";
import {OrderComponent} from "./componets/account/models/order/order.component";
import {MoreGoodsInfoComponent} from "./componets/shop/more-goods-info/more-goods-info.component";
import {AdminComponent} from "./componets/admin/admin.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {DictionaryComponent} from "./componets/library/models/dictionary/dictionary.component";
import {VideoComponent} from "./componets/library/models/video/video.component";
import {AudioComponent} from "./componets/library/models/audio/audio.component";
import {BookComponent} from "./componets/library/models/book/book.component";
import {CourseComponent} from "./componets/library/models/course/course.component";
import {AdminGoodsComponent} from "./componets/admin/models/goods/admin-goods.component";
import {AdminOrderComponent} from "./componets/admin/models/order/admin-order.component";
import {AdminCategoryComponent} from "./componets/admin/models/category/admin-category.component";
import {AdminLanguageComponent} from "./componets/admin/models/language/admin-language.component";
import {AdminCloseOrderComponent} from "./componets/admin/models/close-order/admin-close-order.component";
import {AdminGoodsDescriptionComponent} from "./componets/admin/models/goods-description/admin-goods-description.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'account', component: AccountComponent, canActivate: [AuthGuard],
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'order'
      },
      {
        path: 'order',
        component: OrderComponent
      }
    ]
  },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-goods'
      },
      {
        path: 'admin-goods',
        component: AdminGoodsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-order'
      },
      {
        path: 'admin-orders',
        component: AdminOrderComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-category'
      },
      {
        path: 'admin-category',
        component: AdminCategoryComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-language'
      },
      {
        path: 'admin-language',
        component: AdminLanguageComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-close-orders'
      },
      {
        path: 'admin-close-orders',
        component: AdminCloseOrderComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-goods-description'
      },
      {
        path: 'admin-goods-description',
        component: AdminGoodsDescriptionComponent
      },

    ]
  },
  {path: 'about', component: AboutComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'more-goods-info', component:MoreGoodsInfoComponent},
  {path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  {path: 'library/dictionary', component: DictionaryComponent, canActivate: [AuthGuard]},
  {path: 'library/video', component: VideoComponent, canActivate: [AuthGuard]},
  {path: 'library/audio', component: AudioComponent, canActivate: [AuthGuard]},
  {path: 'library/book', component: BookComponent, canActivate: [AuthGuard]},
  {path: 'library/course', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: BasketComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// {path: 'library', component: LibraryComponent,
//   children: [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'dictionary'
//   },
//   {path: 'dictionary', component: DictionaryComponent},
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'video'
//   },
//   {path: 'video', component: VideoComponent},
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'audio'
//   },
//   {path: 'audio', component: AudioComponent},
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'book'
//   },
//   {path: 'book', component: BookComponent},
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'course'
//   },
//   {path: 'course', component: CourseComponent},
// ]},
