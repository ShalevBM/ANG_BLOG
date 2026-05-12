import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  formStatus: string = 'Add';
  formCategory: string = '';
  categoryId: string;
  catgoryArray: any;

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      console.log(val);
      this.catgoryArray = val;
    });
  }

  onEdit(category: any, id:any) {
    console.log(category);
    this.formCategory = category;
    this.categoryId = id;
    this.formStatus = 'Edit';
  }

  onDelete(id: any) {
    this.categoryService.deleteData(id)
  }


  constructor(private categoryService: CategoriesService) {}

    onSubmit(formData:any) {
    let categoryData: Category = {
      category: formData.value.category,
      //status:'active'
    };
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }

    // //console.log(categoryData);
    // let subCategoryData={
    //   subCategory:'subCategory1'

    // }
  }

  editCategory(id: string, category: string) {
    this.categoryId = id;
    this.formCategory = category;
    this.formStatus = 'Edit';
  }
}