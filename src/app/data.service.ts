import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, getDoc,doc, getDocs, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private auth : Auth , private fire : Firestore) {
    this.panier = []
    this.product = []
    this.ProductSearch=[]
    this.VerifyUser()
   }
  Banner : any
  Four:any 
  categorie : any 

  panier : any
  PanierCompter = 0
  StPanier = 0 
  load={
    menu:false,
    home:false
  }
  //user
  User:any
  VerifyUser(){
    onAuthStateChanged(this.auth,async(user)=>{
      if(user){
        const refUser = await getDoc(doc(this.fire,"USERS", user.uid)) 
        if(refUser.exists()){
          this.User = refUser.data()
        }
      }
    })
  }
  
  //recherche 
  product : any 
  ProductSearch:any 
  Search(word:string){
    if(word){
      this.product = this.ProductSearch.filter(e => e.product_name.toLowerCase().includes(word.toLowerCase()))
      if(!this.product[0]){
        this.product = [] 
      }
    }else{
      this.product = []
    }
    
  }
  
}
