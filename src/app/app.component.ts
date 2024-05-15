import { Component, OnInit, DestroyRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  // standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'film-catalog';
  protected isVisible = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(`(min-width: 585px)`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        if (!state.matches) {
          this.isVisible = false;
        }
      });
  }
}
