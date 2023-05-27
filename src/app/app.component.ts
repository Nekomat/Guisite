import { Component } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  { 
  constructor(private fire : Firestore , private router : Router){
    router.navigateByUrl("/")
  }
  Cate : any
  Four : any
  
}
