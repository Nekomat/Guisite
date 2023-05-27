import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {
  hideBackbuton=true 
  constructor(public service : DataService , private auth : Auth , private router : Router , private back : Location){
    console.log(router.url)
    if(router.url =="/"){
        this.hideBackbuton = false
    }
  }
  deleteInCart(item){
   this.service.panier = this.service.panier.filter(e => e.id != item.id)
   this.service.StPanier -= item.sales_price * item.qty
  }
  //se deconnecté 
  signout(){
  signOut(this.auth).then(()=>{
   this.router.navigateByUrl("/")
  })
  }
  //pour la recherce
  word = ""
  //pour le retour 
  Back(){
    this.back.back()
  }
}
