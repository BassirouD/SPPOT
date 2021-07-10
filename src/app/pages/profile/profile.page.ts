import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
