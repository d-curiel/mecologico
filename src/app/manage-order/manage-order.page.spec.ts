import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageOrderPage } from './manage-order.page';

describe('ManageOrderPage', () => {
  let component: ManageOrderPage;
  let fixture: ComponentFixture<ManageOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
