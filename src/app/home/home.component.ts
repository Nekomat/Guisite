import { Component , OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { DataService } from '../data.service';
import { MessageService } from 'primeng/api';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit{ 
 
  constructor(private fire : Firestore , public service : DataService , private messageService: MessageService , private router : Router){}
  //les varibles pour le slides
  responsiveOptions: any[];
 async ngOnInit() { 
  this.responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
  //pour la banniere
      if(!this.service.Banner){
        const refBanner = await getDocs(collection(this.fire,"BANNIERE"))
        this.service.Banner = [] 
        refBanner.forEach((element)=>{
         this.service.Banner.push(element.data()) 
        })
        this.service.load.home = true
      }else{
        this.service.load.home = true
      }
     //prendre les fournisseurs
     if(!this.service.Four){
      const refFour = await getDocs(collection(this.fire,"FOURNISSEURS"))
      this.service.Four = []
      refFour.forEach((element)=>{
      this.service.Four.push(element.data())
      })
      this.service.load.home = true
     }else{
      this.service.load.home = true
     }
     //prendre les categories et products
     if(!this.service.categorie){
      const refCate = await getDocs(collection(this.fire,"CATEGORIES")) 
       this.service.categorie = []
       refCate.forEach((element)=>{
        let take : any = element.data() 
        if(take.products[0] && take.products.length >=4){ 
          take.products.forEach((element1)=>{
            element1.isPanier = false
            element1.ShowLess=false
            element1.qty = 1
          })
          this.service.categorie.push(take) 
        }
       })
       
       this.service.load.home = true
     }else{
      this.service.load.home = true
     }
  } 
 //ajouter au panier
 AddToCart(item){
  this.service.StPanier +=item.sales_price
  item.isPanier = true 
  this.service.PanierCompter++
  this.service.panier.push(item) 
  this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: `Produit ajouté dans votre panier` });
 }
 //augmenter la quantité
 addQty(item){
  item.qty++
  this.service.StPanier +=item.sales_price
  item.ShowLess = true
   let i = this.service.panier.findIndex(e => e.id == item.id)
   this.service.panier[i] = item
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
  }
 }
 //supprimer du panier
 DeleteinCart(item){
  this.service.StPanier -=item.sales_price*item.qty
  item.isPanier = false
  item.qty = 1 
  this.service.panier = this.service.panier.filter(e => e.id != item.id)
  this.service.PanierCompter--
  this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: `Produit supprimé dans votre panier` });
 }
 //go to four product
 GotoFourProduct(id){
   this.router.navigate(['/Fourproducts',id]) 
 }
 //go to Categeorie Product
 GotoCateProduct(id){
  this.router.navigate(['/categorie',id]) 
 }
 //single product view 
 
}
