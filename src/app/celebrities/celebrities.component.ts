import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrl: './celebrities.component.scss',
})
export class CelebritiesComponent implements OnInit {
  celebritiesArray: { name: string; profile_path: string }[] = [];

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.apiService.fetchCelebrities().subscribe(
      (response) => {
        console.log(response);
        this.celebritiesArray = response.results;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clickOnCard(card: any) {
    this.dataService.detailInfoAboutPersonId = card.id
  }
}
