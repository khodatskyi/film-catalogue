import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent implements OnInit {
  isVisible = false

  constructor(private dataService: DataService, public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 651px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport width is 651px or less!');
        } else {
          console.log('Viewport width is greater than 651px!');
          this.isVisible = false
        }
      });
  }

  // clickOnBurger() {
  //   this.isVisible = true
  // }

  updateCategory(category: string) {
    this.dataService.updateSelectedCategory(category);
  }
}
