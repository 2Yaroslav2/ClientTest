import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IOrder} from "../../../../models/interfaces/order/order.model";
import {DatePipe} from "@angular/common";
import {ICloseOrder} from "../../../../models/interfaces/close-order/close-order.model";

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'admin-close-order',
  styleUrls: ['admin-close-order.component.css'],
  templateUrl: 'admin-close-order.component.html',
})
export class AdminCloseOrderComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'orderNumber',
    'userId',
    'goodsId',
    'date',
    'price',
    'totalPrice',
    'quantity',
    'close',
    'endDate',
  ]; // 'remove','edit'

  dataSource: MatTableDataSource<ICloseOrder>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  myDate: Date = new Date();
  myDateString: string | null = '';
  constructor(private datePipe: DatePipe) {
    this.myDateString = this.datePipe.transform(this.myDate,  'dd-MM-yyyy');

    const closeOrders = Array.from({length: 100}, (_, k) => createNewUser(this.myDateString, k + 1));
    this.dataSource = new MatTableDataSource(closeOrders);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(date: any ,id: number): ICloseOrder {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id,
    name: name,
    orderNumber: Math.round(Math.random() * 100).toString(),
    userId: Math.round(Math.random() * 100).toString(),
    goodsId: Math.round(Math.random() * 100),
    date: date.toString(),
    price: Math.round(Math.random() * 100),
    totalPrice: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    close: false,
    endDate: date.toString()
  };
}

