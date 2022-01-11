import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ICategory} from "../../../../models/interfaces/category/category.model";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryComponent} from "./models/add/add-category.component";
import {EditCategoryComponent} from "./models/edit/edit-category.component";
import {Store} from "@ngrx/store";
import {CategoryAction} from "../../../../store/actions/category/category.action";
import {CategoryService} from "../../../../service/category/category.service";
import {GoodsActions} from "../../../../store/actions/goods/goods.actions";
import {CategorySelectors} from "../../../../store/selectors/category/category.selectors";


@Component({
  selector: 'admin-category',
  styleUrls: ['admin-category.component.css'],
  templateUrl: 'admin-category.component.html',
})
export class AdminCategoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'languageId', 'categoryId', 'remove', 'edit'];
  dataSource: MatTableDataSource<ICategory>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private display: MatDialog, private store: Store, private categoryService :CategoryService) {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(users);
    this.dataSource = new MatTableDataSource<ICategory>();
    this.getCategory();
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

  addCategoryClick() {
    this.display.open(AddCategoryComponent, {autoFocus: false});
  }

  removeCategory(id: number) {
    this.categoryService.delete(id).subscribe( res =>{
      if (res){
        this.store.dispatch(CategoryAction.removeCategory({id: id}));
      }
    });
  }

  editCategory(id: number) {
    this.store.dispatch(CategoryAction.selectCategory({id: id}));
    this.display.open(EditCategoryComponent, {autoFocus: false})
  }

  getCategory(){
    this.store.select(CategorySelectors.selectAllCategory)
      .subscribe(res =>{
        if (res.length != 0){
          this.dataSource = new MatTableDataSource(res);
        }
        else{
          this.categoryService.getAll().subscribe(items=>{
            if (items !=null){
              this.store.dispatch(CategoryAction.addListCategory({categories: items}));
              this.dataSource = new MatTableDataSource(items);
            }
          });
        }
      });
  }
}

function createNewUser(id: number): ICategory {
  return {
    id: id,
    name: 'category ' + id,
    languageId: Math.round(Math.random() * 5),
    categoryId: Math.round(Math.random() * 5)
  };
}
