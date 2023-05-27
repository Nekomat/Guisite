import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth,provideAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './head/head.component';
import { MenuComponent } from './menu/menu.component';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from "ng-lazyload-image";
import { SwiperModule } from 'swiper/angular';
import { environment } from 'src/environments/environment.development';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { AnimateModule } from 'primeng/animate';
import { ToastModule } from 'primeng/toast'; 
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LoginComponent } from './login/login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import {FormsModule} from "@angular/forms"
import { HttpClientModule,} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import { CategorieproductComponent } from './categorieproduct/categorieproduct.component';
import { TabViewModule } from 'primeng/tabview';
import { FourproductComponent } from './fourproduct/fourproduct.component';
import { DialogModule } from 'primeng/dialog';
import { SingleviewComponent } from './singleview/singleview.component';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadComponent,
    MenuComponent,
    LoginComponent,
    SearchComponent,
    CategorieproductComponent,
    FourproductComponent,
    SingleviewComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(()=> getAuth()),
    LazyLoadImageModule,
     SwiperModule,
    ButtonModule,
    CarouselModule,
    ToolbarModule,
    TagModule ,
    AnimateModule,
    ToastModule ,
    OverlayPanelModule,
    TabMenuModule,
    FormsModule,
    HttpClientModule,
    TabViewModule,
    DialogModule
  ],
  providers: [ { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },],
  bootstrap: [AppComponent]
})
export class AppModule { }
