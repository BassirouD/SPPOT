import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classement-dossier',
  templateUrl: './classement-dossier.page.html',
  styleUrls: ['./classement-dossier.page.scss'],
})
export class ClassementDossierPage implements OnInit {

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

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

    changeMode(){
        this.clicked = false;
    }

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string{
        return this.selecteTextId == textId? "highlight-color" : "";
    }

}
