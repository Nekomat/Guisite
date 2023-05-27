import { Component } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private fire : Firestore , public service : DataService , private router : Router){}
  Cate : any
  Four : any
 async ngOnInit() {
  //pour les categories
      const refCate = await getDocs(collection(this.fire,'CATEGORIES')) 
      this.Cate = []
      refCate.forEach((element)=>{
        let take :any = element.data()
        if(take.products[0]){
          this.Cate.push(take)
        }
      })
      //pour les fournisseurs 
      const refFour = await getDocs(collection(this.fire,"FOURNISSEURS")) 
      this.Four = []
      refFour.forEach((element)=>{
        this.Four.push(element.data())
      })
      this.service.load.menu = true
  }
  //go to categorie product 
  Gotocate(id,item,i){
      item.active= i
   this.router.navigate(['/categorie',id])
  }
  //go to fourProduct 
  GotoFourProduct(id){
   this.router.navigate(["/Fourproducts",id])
  }
}
