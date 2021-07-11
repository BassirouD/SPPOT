import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tendance-evolution',
  templateUrl: './tendance-evolution.page.html',
  styleUrls: ['./tendance-evolution.page.scss'],
})
export class TendanceEvolutionPage implements OnInit {

    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    constructor() { }

    ngOnInit() {
    }

    catSlideOpts = {
        slidesPerView: 2.2,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        freeMode: true,
        loop: false,
        centeredSlides: false,
    };

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string{
        return this.selecteTextId == textId? "highlight-color" : "";
    }

}
