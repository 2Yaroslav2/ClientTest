import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ILanguage} from "../../../../models/interfaces/language/language.model";
import {Store} from "@ngrx/store";
import {LanguageSelectors} from "../../../../store/selectors/language/language.selecters";
import {MatDialog} from "@angular/material/dialog";
import {AddLanguageComponent} from "./models/add/add-language.component";
import {LanguageService} from "../../../../service/language/language.service";
import {LanguageActions} from "../../../../store/actions/language/language.action";
import {EditLanguageComponent} from "./models/edit/edit-language.component";

@Component({
  selector: 'admin-language',
  styleUrls: ['admin-language.component.css'],
  templateUrl: 'admin-language.component.html',
})
export class AdminLanguageComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'remove', 'edit'];
  dataSource: MatTableDataSource<ILanguage>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private display: MatDialog,private store: Store, private languageService: LanguageService) {
    this.dataSource = new MatTableDataSource();
    this.getLanguage();
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

  getLanguage(){
    this.store.select(LanguageSelectors.selectAllLanguage).subscribe(res=>{
      if (res.length != 0){
        this.dataSource = new MatTableDataSource(res);
      }
      else{
        this.languageService.getAll().subscribe(items=>{
          if (items != null){
            this.store.dispatch(LanguageActions.addListLanguage({listLanguage: items}));
            this.dataSource = new MatTableDataSource(items);
          }
        });
      }
    })
  }

  addLanguageClick() {
    this.display.open(AddLanguageComponent, {autoFocus: false});
  }

  removeLanguageClick(id: number) {
    this.languageService.delete(id).subscribe(res=>{
      if (res){
        this.store.dispatch(LanguageActions.removeLanguage({id: id}));
      }
    });
  }

  editLanguageClick(id: number) {
    this.store.dispatch(LanguageActions.selectLanguage({id: id}));
    this.display.open(EditLanguageComponent, {autoFocus: false});
  }
}
