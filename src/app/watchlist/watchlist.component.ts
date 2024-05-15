import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent implements OnInit {
  dataArray: any = [];
  array  =[]

  dataLocalArray: {}[] = []

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataArray = this.dataService.watchListArray;
    console.log(this.dataService.getWatchlistArray());

      if (Object.keys(this.dataArray).length === 0) {
        this.dataArray = this.dataService.getWatchlistArray();
        this.dataService.watchListArray = this.dataArray
        console.log(
          'Наш объект this.detailObject - пустой, вывод данных из локал сторедж'
        );
        console.log(this.dataArray);
      }
    }


    clickOnMinus(card:any) {
      console.log('Мы нажали на минус');
      console.log(this.dataArray);
      let indexToRemove = this.dataArray.findIndex((obj:any) => obj.id === card.id);
      this.dataArray.splice(indexToRemove, 1);
      console.log(indexToRemove);
      console.log(this.dataArray);
      this.dataService.setWatchlistArray(this.dataArray)
    }

    clickOnCard(card: any) {
      console.log('Мы нажали на фильм', card);
      
      this.dataService.detailInfo = card;
      this.dataService.setSelectedMovie(card);
      if(this.router.url === '/detailInfo') {
        window.location.reload();
  
      }
    }
  }

 export interface DataItem {
    poster_path?: string | undefined;
    title?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
  }
  