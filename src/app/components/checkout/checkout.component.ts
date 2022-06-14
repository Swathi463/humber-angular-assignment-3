import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
form!:FormGroup
cartItems$!: Observable<ProductData[]>;
  constructor(public dataStore:DataStoreService,private router: Router) { }
  cartValue:number =0;

  ngOnInit(): void {
    this.form=new FormGroup({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      postalCode:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      cardType:new FormControl('',Validators.required),
      creditCardNo:new FormControl('',Validators.required),
      expiry:new FormControl('',[Validators.required, expiryDate()]),
      cvc:new FormControl('',Validators.required),
      nameoncard:new FormControl('',Validators.required)
      // firstName:new FormControl('',Validators.required)
    })
   this.cartItems$=  this.dataStore.cartItems$;
   this.cartItems$.subscribe((cartItems: ProductData[]) => {
    cartItems.forEach(element => {
      this.cartValue=+element.price.substring(1,element.price.length)+this.cartValue;
    });
  });
   
  }

  Submit(){
    console.log(this.form.value);
    this.cartItems$.subscribe((cartItems: ProductData[]) => {
      console.log(cartItems);

    })
this.router.navigate(['/confirmation']);
  }

}
export function expiryDate():ValidatorFn{
  return (control:AbstractControl):ValidationErrors |null =>{
   const expiryDateMatch = control.value.match(/^\d{2}\/\d{4}$/)
    if(expiryDateMatch){
      return null 
    }
    else{
     return {expiryDateNotValid:true};

    }
    return null
  }
  }
