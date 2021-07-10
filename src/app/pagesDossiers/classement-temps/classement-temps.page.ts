import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classement-temps',
  templateUrl: './classement-temps.page.html',
  styleUrls: ['./classement-temps.page.scss'],
})
export class ClassementTempsPage implements OnInit {

    showLocationDetail = false;

    constructor() { }

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
}
