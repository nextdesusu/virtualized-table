import { Component, OnInit, Input, HostListener, HostBinding } from '@angular/core';
import { TableComponentProps } from "../types";

class Range {
  constructor(
    public readonly from: number,
    public readonly to: number,
    public readonly step: number = 1
  ) { }

  *[Symbol.iterator]() {
    for (let current: number = this.from; current < this.to; current += this.step) {
      yield current;
    }
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() props: TableComponentProps;
  @HostBinding('style.width') hostWidth;
  @HostBinding('style.height') hostHeight;
  rangeX: Range;
  rangeY: Range;

  constructor() {
  }

  private generateRanges(left: number, top: number) {
    const { cellWidth, cellHeight, displayColumns, displayRows } = this.props;
    const rX = Math.floor(left / cellWidth);
    const rY = Math.floor(top / cellHeight);
    const x = rX > 2 ? rX - 2 : 0;
    const y = rY > 2 ? rY - 2 : 0;
    const toRenderX = x + displayColumns + 4;
    const toRenderY = y + displayRows + 4;
    const maxX = toRenderX < this.columns ? toRenderX : this.columns;
    const maxY = toRenderY < this.rows ? toRenderY : this.rows;
    this.rangeX = new Range(x, maxX);
    this.rangeY = new Range(y, maxY);
  }

  @HostListener('scroll', ['$event']) private onScroll($event: Event): void {
    const scrollBar = $event.target as any;
    this.generateRanges(scrollBar.scrollLeft, scrollBar.scrollTop);
  };

  get columns(): number {
    const { data } = this.props;
    return data.length;
  }

  get rows(): number {
    const { data } = this.props;
    if (Array.isArray(data[0])) {
      return data[0].length;
    }
    return 1;
  }

  get tableHeight(): number {
    return this.props.cellHeight * this.rows;
  }

  get tableWidth(): number {
    return this.props.cellWidth * this.columns;
  }

  ngOnInit(): void {
    const { cellWidth, cellHeight, displayColumns, displayRows } = this.props;
    this.hostHeight = `${cellHeight * displayRows}px`;
    this.hostWidth = `${cellWidth * displayColumns}px`;
    this.generateRanges(0, 0);
  }
}
