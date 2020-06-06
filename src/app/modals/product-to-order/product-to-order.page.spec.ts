import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductToOrderPage } from './product-to-order.page';

describe('ProductToOrderPage', () => {
  let component: ProductToOrderPage;
  let fixture: ComponentFixture<ProductToOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductToOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductToOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
