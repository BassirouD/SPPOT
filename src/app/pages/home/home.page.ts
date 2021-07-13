import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories = [];
  highlights = [];
  featured = [];
  user:any;
  login=localStorage.getItem('login')
  nom:any;
  prenom:any;
  email:any;
  telepohne:any;

  // catSlideOpts = {
  //   slidesPerView: 3.5,
  //   spaceBetween: 10,
  //   slidesOffsetBefore: 11,
  //   freeMode: true
  // };

  highlightSlideOpts =  {
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  };

  featuredSlideOpts = {
    slidesPerView: 0.5,
    spaceBetween: 10,
      // slidesOffsetBefore: 0,
    freeMode: true,
      loop: false,
      centeredSlides: false,
  };

    catSlideOpts = {
        slidesPerView:0.7,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        freeMode: true,
        loop: false,
        centeredSlides: false,
    };

  showLocationDetail = false;


  constructor(private router: Router,private authS:AuthService) { }

  ngOnInit() {
      this.checkUser();
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 40;
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  checkcode(event){
    let mois=event.target.value;
    console.log(event.target.value)
    localStorage.setItem('periode',mois);
  }


  checkannee(event){
    let annee=event.target.value;
    console.log(event.target.value)
    localStorage.setItem('annee',annee);
  }

    gotoCDossier(){
      this.router.navigate(['/classement-dossier']);
    }

    gotoTE(){
        this.router.navigate(['/tendance-evolution']);
    }

    gotoTM(){
        this.router.navigate(['/tendance-moyenne']);
    }

    gotoPC(){
        this.router.navigate(['/performande-comparee']);
    }

    gotoPT(){
        this.router.navigate(['/classement-temps']);
    }

    gotoEG(){
        this.router.navigate(['/etat-global-dossier']);
    }

    checkUser(){
        this.authS.getUser(this.login)
        .subscribe(data=>{
          this.user=data;
          console.log(this.user);
          this.nom=this.user.nom
          this.prenom=this.user.prenom
          this.email=this.user.email;
          this.telepohne=this.user.telephone;
        })
      }

}
