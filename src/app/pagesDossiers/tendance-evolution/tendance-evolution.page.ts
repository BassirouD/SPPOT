import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tendance-evolution',
  templateUrl: './tendance-evolution.page.html',
  styleUrls: ['./tendance-evolution.page.scss'],
})
export class TendanceEvolutionPage implements OnInit {

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
