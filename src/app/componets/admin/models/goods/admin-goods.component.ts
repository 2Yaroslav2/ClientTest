import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IGoods} from "../../../../models/interfaces/goods/goods.model";
import {MatDialog} from "@angular/material/dialog";
import {AddGoodsComponent} from "./models/add/add-goods.component";
import {GoodsService} from "../../../../service/goods/goods.service";
import {Store} from "@ngrx/store";
import {GoodsActions} from "../../../../store/actions/goods/goods.actions";
import {GoodsSelectors} from "../../../../store/selectors/goods/goods.selecters";
import {EditGoodsComponent} from "./models/edit/edit-goods.component";


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
  selector: 'admin-goods',
  styleUrls: ['admin-goods.component.css'],
  templateUrl: 'admin-goods.component.html',
})
export class AdminGoodsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'numberOfDays',
    'quantityInStock',
    'categoryId',
    'discount',
    'countPurchased',
    'image',
    'remove',
    'edit'
  ];
  dataSource!: MatTableDataSource<IGoods>;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private goodsService: GoodsService, private store: Store) {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource<IGoods>(users);
    this.dataSource = new MatTableDataSource<IGoods>();
    this.getGoods();
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

  addGoods() {
    this.dialog.open(AddGoodsComponent, {autoFocus: false})
  }

  removeProduct(id: number) {
    this.goodsService.delete(id).subscribe(res=>{
      if (res){
        this.store.dispatch(GoodsActions.removeGoods({id: id}));
      }
    });
  }

  editGoods(id: number) {
    this.store.dispatch(GoodsActions.selectGoods({id: id}));
    this.dialog.open(EditGoodsComponent, {autoFocus: false});
  }

  getGoods(){

    this.goodsService.getAll().subscribe(items=>{
      if (items != null){
        this.store.dispatch(GoodsActions.addListGoods({listGoods: items}));
        this.store.select(GoodsSelectors.selectAllGoods).subscribe(res=>{
          if (res.length != 0){
            this.dataSource = new MatTableDataSource(res);
          }
        });
      }
    });
  }

}

function createNewUser(id: number): IGoods {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id,
    name: name,
    price: Math.round(Math.random() * 100),
    numberOfDays: Math.round(Math.random() * 10),
    quantityInStock: Math.round(Math.random() * 10),
    categoryId: 1,
    discount: 0,
    countPurchased: 100,
    image: 'new image' + id
  };
}
