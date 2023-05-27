import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categorieproduct',
  templateUrl: './categorieproduct.component.html',
  styleUrls: ['./categorieproduct.component.scss']
})
export class CategorieproductComponent {
  constructor(public service : DataService , private route : ActivatedRoute){
    route.paramMap.subscribe(()=>{
   let take = this.service.categorie.filter(e =>e.id == this.route.snapshot.paramMap.get('id')) 
    this.OnCate = take[0] 
    })
  } 
  OnCate:any
  id:any

    //ajouter au panier
 AddToCart(item){
  this.service.StPanier +=item.sales_price
  item.isPanier = true 
  this.service.PanierCompter++ 
  this.service.panier.push(item)
  this.service.categorie.forEach((element)=>{
    element.products.forEach(element2=>{
      if(element2.id == item.id){
        element2=item
      }
    })
  })
 }
 //augmenter la quantité
 addQty(item){
  item.qty++
  this.service.StPanier +=item.sales_price
  item.ShowLess = true
   let i = this.service.panier.findIndex(e => e.id == item.id)
   this.service.panier[i] = item
   this.service.categorie.forEach((element)=>{
    element.products.forEach(element2=>{
      if(element2.id == item.id){
        element2=item
      }
    })
  })
 }
 //dimunier la quantité
 LessQty(item){
  if(item.qty > 1){
    item.qty--
    this.service.StPanier -=item.sales_price
    let i = this.service.panier.findIndex(e => e.id == item.id)
    this.service.panier[i] = item
    if(item.qty == 1){
      item.ShowLess = false
    }
    this.service.categorie.forEach((element)=>{
      element.products.forEach(element2=>{
        if(element2.id == item.id){
          element2=item
        }
      })
    })
  }
 }
 //supprimer du panier
 DeleteinCart(item){
  this.service.StPanier -=item.sales_price*item.qty
  item.isPanier = false
  item.qty = 1
  this.service.panier = this.service.panier.filter(e => e.id != item.id)
  this.service.PanierCompter-- 
  this.service.categorie.forEach(element=>{
    element.products.forEach(element2 => {
      if(item.id == element2.id){
        element2.isPanier = false
        element2.ShowLess=false
        element2.qty = 1 
        
      }
    })
  })
  
 }
}
