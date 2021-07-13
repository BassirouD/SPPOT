import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  showLocationDetail = false;
  public pepperoni:boolean=false;
  public pepperoni1:boolean=false;
  user:any;
  login=localStorage.getItem('login')
  nom:any;
  prenom:any;
  email:any;
  telepohne:any;

  constructor(private router: Router,private auths:AuthService) { }

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

    logOut(){
        localStorage.removeItem('periode');
        localStorage.removeItem('annee');
        //this.router.navigate(['login']);
        this.router.navigateByUrl('/');
    }

    goToChangePassword(){
        this.router.navigateByUrl('/change-password');
    }

    goToChangeProfil(){
        this.router.navigateByUrl('/change-profil');
    }

    checkUser(){
        this.auths.getUser(this.login)
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
