import { Component, OnInit } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { OrderData } from 'src/app/models/order.interface';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  orderNumber:string='';
  order:OrderData={
    orderNumber:'',
    total:''
  };
  cartItems$!: Observable<ProductData[]>;
  constructor(private dataStore: DataStoreService) { }
  ngOnInit(): void {
    this.orderNumber = Math.ceil(Math.random()*10000000000).toString();
    this.order.orderNumber=this.orderNumber;
    this.dataStore.cartItems$.pipe(
      filter(x=>x.length>0),
take(1)
    ).subscribe((cartItems: ProductData[]) => {
      cartItems.forEach(element => {
        this.order.total=(+this.order.total+ + element.price.substring(1,element.price.length)).toString();
        
      });
      this.order.total='$'+ this.order.total;
      this.dataStore.addToOrders(this.order);
    });
    
    this.dataStore.clearCart();
  }

  

}
