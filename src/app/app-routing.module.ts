import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainContentComponent from "./main-content/main-content.component"
import { WatchlistComponent } from './watchlist/watchlist.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { DetailsInfoAboutComponent } from './details-info-about/details-info-about.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsAboutPersonComponent } from './details-about-person/details-about-person.component';
import { VideoPlayerComponent } from './video-player/video-player.component'; 



const routes: Routes = [
  { path: '', redirectTo: '/main-content', pathMatch: 'full' },
  { path: 'main-content', component: MainContentComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'celebrities', component: CelebritiesComponent },
  { path: 'detailInfo', component: DetailsInfoAboutComponent },
  { path: 'searchResults', component: SearchResultsComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about-person', component: DetailsAboutPersonComponent },
  { path: 'video-player', component: VideoPlayerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
