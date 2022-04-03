import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
 currentCategoryId!: number;
 searchMode: boolean = false;

  constructor(private productListService: ProductService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProduct();
    });
  }

  listProduct() {

    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
    }
  }
 
  handleListProducts(){

    //check if id paramter is available
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //if it has category id then read it and convert it to number
      this.currentCategoryId= Number(this.route.snapshot.paramMap.get('id'));
    }
    else{
//if category id is not available then default to category id of 1
this.currentCategoryId=1;   
}

    this.productListService.getProductList(this.currentCategoryId).subscribe(
      (data: Product[]) => {
      this.products = data;
    });
  }

  handleSearchProducts() {
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;

    this.productListService.searchProducts(theKeyword).subscribe(
      (      data: Product[])=>{
        this.products=data;      }
    )

  }
}
