import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AddGoodsDescriptionComponent} from "./models/add/add-goods-description.component";
import {EditGoodsDescriptionComponent} from "./models/edit/edit-goods-description.component";
import {IGoodsDescription} from "../../../../models/interfaces/goods-description/goods-description.model";
import {GoodsDescriptionSelectors} from "../../../../store/selectors/goods-description/goods-description.selecters";
import {GoodsDescriptionService} from "../../../../service/goods-description/goods-description.service";
import {GoodsDescriptionActions} from "../../../../store/actions/goods-description/goods-description.action";


@Component({
  selector: 'admin-goods-description',
  styleUrls: ['admin-goods-description.component.css'],
  templateUrl: 'admin-goods-description.component.html',
})
export class AdminGoodsDescriptionComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'goodsId', 'languageId', 'description', 'remove', 'edit'];
  dataSource: MatTableDataSource<IGoodsDescription>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private display: MatDialog, private store: Store, private goodsDescriptionService :GoodsDescriptionService) {
    this.dataSource = new MatTableDataSource<IGoodsDescription>();
    this.getGoodsDescription();
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

  addGoodsDescriptionClick() {
    this.display.open(AddGoodsDescriptionComponent, {autoFocus: false});
  }

  removeGoodsDescriptionClick(id: number) {
    this.goodsDescriptionService.delete(id).subscribe( res =>{
      if (res){
        this.store.dispatch(GoodsDescriptionActions.removeGoodsDescription({id: id}));
      }
    });
  }

  editGoodsDescriptionClick(id: number) {
    this.store.dispatch(GoodsDescriptionActions.selectGoodsDescription({id: id}));
    this.display.open(EditGoodsDescriptionComponent, {autoFocus: false})
  }

  getGoodsDescription(){
    this.store.select(GoodsDescriptionSelectors.selectAllGoodsDescription)
      .subscribe(res =>{
        if (res.length != 0){
          this.dataSource = new MatTableDataSource(res);
        }
        else{
          this.goodsDescriptionService.getAll().subscribe(items=>{
            if (items !=null){
              this.store.dispatch(GoodsDescriptionActions.addListGoodsDescription({listGoodsDescription: items}));
              this.dataSource = new MatTableDataSource(items);
            }
          });
        }
      });
  }
}
