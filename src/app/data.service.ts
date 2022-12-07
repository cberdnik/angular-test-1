import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private readonly dataArray: Array<Array<string>>;
  private readonly nColumns = 5;

  constructor() {
    this.dataArray = this.createRandomData();
  }

  public updateData(percent: number): string[][] {
    const maxRowIndex = this.dataArray.length - 1;
    const iterations = Math.round(maxRowIndex * percent);
    console.log(`updating ${iterations} rows`);
    for (let i = 0; i < iterations; i++) {
      const rowIndex = Math.round(maxRowIndex * Math.random());
      const colIndex = Math.round((this.nColumns - 1) * Math.random());
      this.dataArray[rowIndex][colIndex] = Math.round(
        Math.random() * 1000
      ).toString();
      this.dataArray[rowIndex][5] = this.getHashCode(
        this.dataArray[rowIndex].join(',')
      );
    }

    return [...this.dataArray];
  }

  public createRandomData(): string[][] {
    const dataArray: Array<Array<string>> = [];
    for (let i = 0; i < 5000; i++) {
      dataArray.push(this.generateRandomArray());
    }

    return dataArray;
  }

  private generateRandomArray() {
    const row = Array.of(
      Math.round(Math.random() * 1000).toString(),
      Math.round(Math.random() * 1000).toString(),
      Math.round(Math.random() * 1000).toString(),
      Math.round(Math.random() * 1000).toString(),
      Math.round(Math.random() * 1000).toString()
    );
    row.push(this.getHashCode(row.join(',')));

    return row;
  }

  private getHashCode(str: string): string {
    let hash = 0;
    let chr: number;

    if (str.length === 0) {
      return hash.toString();
    }

    for (let i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash.toString();
  }
}
