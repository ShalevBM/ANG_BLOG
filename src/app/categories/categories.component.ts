import { Component } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  formStatus:string="Add";
  formCategory:string;
  constructor(private categoryService: CategoriesService){}
  onSubmit(formData:any){
    let categoryData:Category={
      category:formData.value.category,
    };
     if(this.formStatus=="Add"){
    this.categoryService.saveData(categoryData);
    formData.reset();
    // }else if(this.formStatus=="Edit"){
    //   this.categoryService.updateData(this.categoryId, categoryData);
    //   formData.reset();
    //   this.formStatus="Add";
    }
  }
}
