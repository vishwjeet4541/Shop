import { identifierModuleUrl } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public ItemData : FormGroup;
  item: any;
  itemlist: unknown;

  array:any;
  Id: any[];
  itemlistId: any;
  elementarray: any;

  constructor(public nav:NavController, public loadingController:LoadingController, 

    private afs: AngularFirestore,  public formBuilder: FormBuilder) {

    this.ItemData = formBuilder.group({
      item_id: ['',[Validators.required, Validators.minLength(2)]],
      item_Name: ['',[Validators.required, Validators.minLength(2)]],
      item_Rate: ['',[Validators.required, Validators.minLength(2)]],
      item_barcode: ['',[Validators.required,  Validators.maxLength(5)]],
      // BusinessName: [''],
    

  });
  this.readata();
  }
  submitForm(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data saved successfully ',
      showConfirmButton: false,
      timer: 1500
    })
    let formdata= this.ItemData.value
    console.log(  this.ItemData.value)
    var frankDocRef = this.afs.collection("Item_Master");
    frankDocRef.add ({
       item_id: formdata.item_id,
       item_Name: formdata.item_Name,
       item_Rate: formdata.item_Rate,
       item_barcode:formdata.item_barcode

    })
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
          return { id};
        }   )
      )
     );
   this.itemlistId.subscribe( element=>{
  this.elementarray = element
   })
  
   
  }

  delete(data){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'deleted successfully',
      showConfirmButton: false,
      timer: 1500
    })
  var id =  this.elementarray[data]
  console.log(id.id)
  var collection = this.afs.collection("Item_Master")
  collection.doc(id.id).delete()

  }
}
