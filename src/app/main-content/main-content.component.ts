import { Component, OnInit, DestroyRef } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export default class MainContentComponent implements OnInit {
  data: any;
  popularCard: { poster_path: string; title: string }[] = [];
  popularTVSeries: { backdrop_path: string; name: string; id: number }[] = [];
  currentTVIndex: number = 0;
  watchListArray: { poster_path: string; title: string }[] = [];

  filteredArray: { key: string }[] = [];
  title = 'Title';
  linkToPhoto: string = '';

  message: any = '';

  carouselIterator = 4;

  protected isVisible = false;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.apiService.fetchData().subscribe(
      (result) => {
        this.data = result;
        this.limitedArray();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.apiService.fetchTopRatedTVShows().subscribe(
      (result) => {
        this.popularTVSeries = result.results.slice(0, 4);
        console.log(this.popularTVSeries);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.apiService.fetchPhoto(this.linkToPhoto).subscribe(
      (result) => {
        this.data = result;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );


    // обзервер для адаптивности карусели. В зависимости от размера эрана кол-во элементов в карусели меняется
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.carouselIterator = 1;
        } else if (state.breakpoints[Breakpoints.Small]) {
          this.carouselIterator = 2;
        } else if (state.breakpoints[Breakpoints.Medium]) {
          this.carouselIterator = 3;
        } else if (state.breakpoints[Breakpoints.Large]) {
          this.carouselIterator = 4;
        }
      });
  }

  limitedArray() {
    this.popularCard = this.data.results.sort(
      (a: any, b: any) => b.popularity - a.popularity
    );
    this.popularCard = this.popularCard.slice(0, 12);
    console.log(this.popularCard);
  }

  pressToWatch(card: any, event: any) {
    const type = card.media_type || 'tv';
    this.apiService.fetchVideoTrailer(card.id, type).subscribe(
      (result: any) => {
        this.filteredArray = result.results.filter(
          (obj: { type: string }) => obj.type === 'Trailer'
        );
        if (this.filteredArray.length > 0) {
          // window.open(
          //   `https://www.youtube.com/watch?v=${this.filteredArray[0].key}`,
          //   '_blank'
          // );
          // this.router.navigate(['/video-player'])
          this.dataService.filmUrl = this.filteredArray[0].key;
          this.router.navigate(['/video-player']);
          // window.open(
          //   `https://www.youtube.com/embed/wYmtRhKvmVE`,
          //   '_blank'
          // );
        } else {
          console.log(this.filteredArray);
          this.message = 'Sorry, we don`t have video';

          console.error('No video key found.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    event.stopPropagation();
  }

  pressAddToWatchList(card: any, event: any) {
    if (
      this.dataService.watchListArray.some(
        (item) => JSON.stringify(item) === JSON.stringify(card)
      )
    ) {
      console.log('Такой фильм уже у нас есть');
    } else {
      this.dataService.watchListArray.push(card);
      this.dataService.setWatchlistArray(this.dataService.watchListArray);
    }
    console.log(this.dataService.watchListArray);
    event.stopPropagation();
  }

  // carousel

  // prevTVSeries() {
  //   this.currentTVIndex =
  //     (this.currentTVIndex - 1 + this.popularTVSeries.length) %
  //     this.popularTVSeries.length;
  // }

  // nextTVSeries() {
  //   this.currentTVIndex =
  //     (this.currentTVIndex + 1) % this.popularTVSeries.length;
  // }

  // get currentTVImage(): string {
  //   return this.popularTVSeries[1]?.backdrop_path
  //     ? `https://www.themoviedb.org/t/p/original${this.popularTVSeries[this.currentTVIndex].backdrop_path
  //     }`
  //     : '';
  // }

  // get currentTVName(): string {
  //   return this.popularTVSeries[this.currentTVIndex]?.name || '';
  // }

  clickOnCard(card: any, event: any) {
    console.log('Мы нажали на фильм', card);

    this.dataService.detailInfo = card;
    this.dataService.setSelectedMovie(card);
    event.stopPropagation();
  }
}
