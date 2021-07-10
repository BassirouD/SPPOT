import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etat-global-dossier',
  templateUrl: './etat-global-dossier.page.html',
  styleUrls: ['./etat-global-dossier.page.scss'],
})
export class EtatGlobalDossierPage implements OnInit {
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
