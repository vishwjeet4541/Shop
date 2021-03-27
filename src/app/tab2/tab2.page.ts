import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  item: unknown[];
  itemlistId: any;
  term = '';
  elementarray: any;
  config: { itemsPerPage: number; currentPage: number; totalItems: number; };
  countT: number;
  pendata: any;
  value: boolean;
  Name: void;
  Rate: any;
  qty: any;
  totalamount: number;
  cal: boolean;
  valueitem: any;
  date: Date;
  number: number;
  todays: string;
  constructor( public nav:NavController, public loadingController:LoadingController, 
    
    private afs: AngularFirestore, ) {
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countT
      };
      this.readata()

      this.date = new Date(),
    
      this.todays = ( this.date.getFullYear() + '/'  +  this.date.getMonth() + '/'  +  this.date.getDate())  
    
    }
  readata(){

    var readdata = this.afs.collection("Item_Master").valueChanges()
    readdata.subscribe( item =>{
      this.item = item
        
     })

   
     var collection = this.afs.collection("Item_Master")
     this.itemlistId = collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id ,data};
        }   )
      )
     );
   this.itemlistId.subscribe( element=>{
  this.elementarray = element
  this.countT = this.elementarray.length
  console.log(  this.elementarray )
   })
  }


  open(i){
    this.value = true
    this.valueitem = i
    this.Name = i.data.item_Name
     this.Rate = i.data.item_Rate 
    console.log(this.valueitem.id)

  }

  calculate(){
    this.cal = true
 this.totalamount = this.qty * this.Rate
 
  }
  save(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data saved successfully ',
      showConfirmButton: false,
      timer: 1500
    })
    var frankDocRef = this.afs.collection("Savedata").doc(`${this.valueitem.id}`);
    frankDocRef.set ({
       item_id:  this.valueitem.data.item_id,
       item_Name:  this.valueitem.data.item_Name,
       item_Rate:  this.valueitem.data.item_Rate,
       item_barcode:  this.valueitem.data.item_barcode,
       Qty:this.qty,
       date:  this.todays,
       Amount: this.totalamount
          
    })
  }

  Cancel(){
    this.cal = false
  }
}
