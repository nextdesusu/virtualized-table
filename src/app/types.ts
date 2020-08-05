export interface Point {
    readonly x: number;
    readonly y: number;
}

export interface TableComponentProps {
    data: Array<Array<any>>;
    cellWidth: number;
    cellHeight: number;
    displayColumns: number;
    displayRows: number;
}