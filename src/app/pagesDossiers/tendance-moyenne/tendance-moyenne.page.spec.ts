import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TendanceMoyennePage } from './tendance-moyenne.page';

describe('TendanceMoyennePage', () => {
  let component: TendanceMoyennePage;
  let fixture: ComponentFixture<TendanceMoyennePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TendanceMoyennePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TendanceMoyennePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
