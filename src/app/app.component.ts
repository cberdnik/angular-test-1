import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { interval, Subject, takeUntil, tap } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular ' + VERSION.major;
  public dataArray: string[][] = [];

  private unsubscriber = new Subject();

  constructor(public dataService: DataService) {}

  public ngOnInit(): void {
    this.dataArray = this.dataService.createRandomData();

    const timer = interval(1000);
    timer
      .pipe(
        tap(() => {
          this.dataArray = this.dataService.updateData(0.5);
        }),
        takeUntil(this.unsubscriber)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next(null);
    this.unsubscriber.complete();
  }

  public trackByRowId(index: number, item: string[]) {
    console.log('trackByRowId');
    return item[5];
  }
}
