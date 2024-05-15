import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-info-about',
  templateUrl: './details-info-about.component.html',
  styleUrl: './details-info-about.component.scss',
})
export class DetailsInfoAboutComponent implements OnInit, OnDestroy {
  detailObject: any = {};
  filteredArray: { key: string }[] = [];
  detailInfo: {
    tagline?: string;
    budget?: string;
    runtime?: number;
    revenue?: string;
    genres?: any[];
    production_companies?: any[];
    production_countries?: any[];
  } = {};
  message: any = '';

  constructor(
    private dataService: DataService,
    private location: Location,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.detailObject = this.dataService.detailInfo;
    console.log(this.dataService.detailInfo);

    if (Object.keys(this.detailObject).length === 0) {
      this.detailObject = this.dataService.getSelectedMovie();
      console.log(
        'Наш объект this.detailObject - пустой, вывод данных из локал сторедж'
      );
      console.log(this.detailObject);
    }

    this.apiService.fetchMovieDetail(this.detailObject.id).subscribe(
      (response) => {
        console.log({
          info: 'detail info about film',
          response: response,
        });
        this.detailInfo = response;
        console.log(this.detailInfo);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  pressAddToWatchList(card: any) {
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
    console.log(this.dataService.getWatchlistArray());
  }

  pressToWatch(card: any) {
    const type = card.media_type || 'tv';
    this.apiService.fetchVideoTrailer(card.id, type).subscribe(
      (result: any) => {
        this.filteredArray = result.results.filter(
          (obj: { type: string }) => obj.type === 'Trailer'
        );
        if (this.filteredArray.length > 0) {
          this.dataService.filmUrl = this.filteredArray[0].key;
          this.router.navigate(['/video-player']);
        } else {
          console.log(this.filteredArray);
          this.message = [
            {
              severity: 'info',
              summary: 'Info',
              detail: '  There will be no video  ',
            },
          ];
          console.error('No video key found.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.message = [
          {
            severity: 'info',
            summary: 'Info',
            detail: '  There will be no video  ',
          },
        ];
      }
    );
  }

  ngOnDestroy(): void {
    this.dataService.deleteDataFromLocalStorage();
  }
}
