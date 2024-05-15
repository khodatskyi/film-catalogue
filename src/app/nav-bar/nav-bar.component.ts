import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  searchTerm: string = '';

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  search() {
    if (this.searchTerm == '') {
      console.log('Мы ничего не можем найти, строка пустая');
      this.searchTerm = 'a';
    }
    this.apiService.search(this.searchTerm).subscribe(
      (data) => {
        this.dataService.setSearchTerm(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // click(name: string) {
  //   this.dataService.selectedCatalog = name;
  //   console.log(this.dataService.selectedCatalog);
  // }

  updateCategory(category: string) {
    this.dataService.updateSelectedCategory(category);
  }
}
