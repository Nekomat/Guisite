import { Component ,OnInit} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fire : Firestore , private auth : Auth , private http : HttpClient , private router : Router){}
  items: MenuItem[];
  activeItem: MenuItem;
  loading = false
  otp=false
  ngOnInit(): void {
    this.items = [
      { label: 'Creer un compte', icon: 'pi pi-user-plus' },
      { label: 'Se connecte', icon: 'pi pi-user' },
  ];
  this.activeItem = this.items[0];
  }
//sendOtp 
name=""
family=""
email=""
phone = ""
password=""
Token : any
Code : any
OtpCode=""
async  sendOtp(){
   if(this.name && this.family && this.email && this.phone && this.password){
    if(this.password.length <6){
      alert("le mot de passe doit etre superieure ou egal à six lettres")
      return
    }
    let regexNumberPhone = /^(\+\d{3}\s?)?\(?6\d{2}\)?[\s-]*\d{2}[\s-]*\d{2}[\s-]*\d{2}$/ 
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!regexNumberPhone.test(this.phone)){
      alert("numéro de télephone incorrecte")
      return
    }
    if(!regexEmail.test(this.email)){
      alert("email incorrecte")
      return
    }
    this.loading = true
    //verification si le mail existe 
    const refEmail = await getDocs(query(collection(this.fire,"USERS"),where("email","==",this.email)))
    const refPhone =  await getDocs(query(collection(this.fire,"USERS"),where("phone","==",this.phone))) 
    let takePhone = []
    let takeEmail = []
     refEmail.forEach((element)=>{
      takeEmail.push(element.data())
     })
     refPhone.forEach((element)=>{
      takePhone.push(element.data())
     })
     if(takeEmail[0]){
      alert("le mail existe déja")
      this.loading = false
      return
     }
     if(takePhone[0]){
      alert("ce numéro de téléphone existe déja")
      this.loading = false
      return 
     }
  //envoi de otp 
  const t = await getDoc(doc(this.fire,'TOKEN','RYIvHDump3Gm3cdS6cs7')) 
  if(t.exists()){
    this.Token = t.data()
    const httpOptions = { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token.tokenSms}`})  
    };
  this.Code =  Math.floor(Math.random() * 10).toLocaleString()+ Math.floor(Math.random() * 10).toLocaleString()+ Math.floor(Math.random() * 10).toLocaleString()+ Math.floor(Math.random() * 10).toLocaleString() + Math.floor(Math.random() * 10).toLocaleString()
    let data2= { 
      'outboundSMSMessageRequest': { 
        'address': `tel:+224${this.phone}`,
        'senderAddress': 'tel:+2240000',  
        "senderName": "Guicart +", 
        'outboundSMSTextMessage': { 
            'message': `Bonjour voici votre code de validation \n ${this.Code} `
        } 
    }
      }
      this.http.post("https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests",data2,httpOptions).subscribe(()=>{
       this.loading= false
      this.otp = true
      }, err => {
        this.loading = false
        alert('erreur reessayer')
      })
  }
  
   }else{
    alert('veuillez bien remplir le formulaire')
   }
  }
  //verification otp
  VerifyOtp(){
   if(this.OtpCode.length==5){
    if(this.OtpCode == this.Code){
       this.loading = true 
       let code = `${this.name[0].toLocaleUpperCase() + this.family[0].toLocaleUpperCase() + Math.floor(Math.random() * 10).toLocaleString().toLocaleUpperCase() + Math.floor(Math.random() * 9).toLocaleString().toLocaleUpperCase() + Math.floor(Math.random() * 10).toLocaleString().toLocaleUpperCase()+Math.floor(Math.random() * 10).toLocaleString().toLocaleUpperCase()}`
     createUserWithEmailAndPassword(this.auth,this.email,this.password).then((user)=>{
    const refUser = doc(collection(this.fire,"USERS"))
    setDoc(refUser,{
                id:refUser.id,
              active : true,
                email:user.user.email, 
                password:this.password,
                code:code,
                name:this.name,
                phone:this.phone,
                family : this.family,
                time : Timestamp.now() ,
                bonus:{
                  active : true,
                  montant : 0
                }
    })
    this.loading = false
     this.router.navigateByUrl('/')
     })
    }else{
      this.OtpCode = ""
      alert("Code otp incorrecte")
      return
    }
   }
  }
  //login
  UserEmail = ""
  UserPassword = ""
  Login(){
    if(this.UserEmail && this.UserPassword) {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if(!regexEmail.test(this.UserEmail)){
        alert("email invalide")
        return
      }
      this.loading = true
      signInWithEmailAndPassword(this.auth,this.UserEmail,this.UserPassword).then(()=>{
        this.loading = false
        this.router.navigateByUrl('/')
      }).catch(()=>{
        this.loading = false 
        alert("email ou mot de passe incorrecte")
      })
    }else{
      alert('Veuillez bien remplir le formulaire')
    }
   
  }
  onActiveItemChange(item : MenuItem){
    this.activeItem = item
  }
}
