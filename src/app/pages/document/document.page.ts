import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

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
