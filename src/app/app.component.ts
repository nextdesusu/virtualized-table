import { Component } from '@angular/core';
import { TableComponentProps } from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tableProps: TableComponentProps;

  constructor() {
    this.tableProps = {
      data: this.generateTable(),
      cellWidth: 100,
      cellHeight: 40,
      displayColumns: 5,
      displayRows: 8
    };
  }

  private generateTable() {
    const sizeX = 100;
    const sizeY = 100;
    const res: Array<Array<string>> = [];
    for (let x = 0; x < sizeX; x += 1) {
      const tmp = [];
      for (let y = 0; y < sizeY; y += 1) {
        tmp.push(`[${x}:${y}]`);
      }
      res.push(tmp);
    }
    return res;
  }
}
