import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tendance-moyenne',
  templateUrl: './tendance-moyenne.page.html',
  styleUrls: ['./tendance-moyenne.page.scss'],
})
export class TendanceMoyennePage implements OnInit {

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
