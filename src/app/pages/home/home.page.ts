import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showLocationDetail = false;

  constructor(private router: Router) { }

  ngOnInit() {
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

}
