import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  item: unknown[];

  constructor(  private afs: AngularFirestore) {

    var readdata = this.afs.collection("Savedata").valueChanges()
    readdata.subscribe( item =>{
      this.item = item
      console.log(item)
        
     })
  }

}
