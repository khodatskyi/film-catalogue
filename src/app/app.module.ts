import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import MainContentComponent from './main-content/main-content.component';
import { CategoriesComponent } from './categories/categories.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { DetailsInfoAboutComponent } from './details-info-about/details-info-about.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DetailsAboutPersonComponent } from './details-about-person/details-about-person.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel';
import { MessagesModule } from 'primeng/messages';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NavBarComponent,
    MainContentComponent,
    CategoriesComponent,
    WatchlistComponent,
    CelebritiesComponent,
    DetailsInfoAboutComponent,
    SearchResultsComponent,
    CatalogComponent,
    CarouselComponent,
    DetailsAboutPersonComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    ButtonModule,
    MessagesModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
