import {Component, OnInit} from '@angular/core';
import {IShop} from "../../models/interfaces/shop/shop.model";
import {ICategory} from "../../models/interfaces/category/category.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CategoryService} from "../../service/category/category.service";
import {CategorySelectors} from "../../store/selectors/category/category.selectors";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  goods: IShop[]= [
    {id: 1,
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      categoryId: 2 ,
      price: 50,
      srcImg: '/assets/basket-assets/goods1.png', address: "book"
    },
    {id: 2,
      title: 'title 2',
      categoryId: 1 ,
      price: 100,
      srcImg: '/assets/basket-assets/goods1.png', address: "audio"
    },
    {id: 3,
      title: 'title 3',
      categoryId: 3 ,
      price: 50,
      srcImg: '/assets/basket-assets/goods1.png', address: "video"
    },
    {id: 4,
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      categoryId: 4 ,
      price: 100,
      srcImg: '/assets/basket-assets/goods1.png', address: "dictionary"
    },
    {id: 5,
      title: 'title 5',
      categoryId: 5 ,
      price: 50,
      srcImg: '/assets/basket-assets/goods1.png', address: "course"
    },
    {id: 6,
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      categoryId: 2 ,
      price: 100,
      srcImg: '/assets/home-assets/spoken-english-language-course.jpg', address: "book"
    }
  ];

  categories: ICategory[] = [];

  filtersFormGroup!: FormGroup;

  constructor(private store: Store, public categoryService: CategoryService) {
    // this.getAllGoods();
    this.filtersFormGroup = new FormGroup({
      filters: new FormArray([])
    });
    // заглушка
    this.categoryService.categories.forEach(() => this.filtersArray.push(new FormControl(false)));
    // this.getCategoryFromStore();
  }

  get filtersArray(): FormArray {
    return this.filtersFormGroup.controls.filters as FormArray;
  }

  getCategoryFromStore(){

    this.store.select(CategorySelectors.selectAllCategory)
      .subscribe(items => {
        this.filtersArray.clear();
        this.categories = items;
        if (this.categories.length == 0){
          this.categoryService.getWhereCategory();
        }
        this.categories.forEach(() => this.filtersArray.push(new FormControl(false)));

      });
  }

  categoryFilter(){
    //заглушка
    this.filtersFormGroup.valueChanges.subscribe(formState => {
      const selectedCategories = formState.filters
        .map((checked: boolean, idx: number) => checked ? this.categoryService.categories[idx] : null)
        .filter(Boolean);
      this.goods = this.categoryService.applyFilterTmp(selectedCategories, this.goods);

    });

    // this.filtersFormGroup.valueChanges.subscribe(formState => {
    //   const selectedCategories = formState.filters
    //     .map((checked: boolean, idx: number) => checked ? this.categories[idx] : null)
    //     .filter(Boolean);
    //   this.goods = this.categoryService.applyFilter(selectedCategories, this.goods);
    //
    // });
  }

  ngOnInit(): void {
    this.categoryFilter();
  }


  viewMoreInfo(id: any, categoryId: any) {

  }
}
