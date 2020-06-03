import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatalogsPage } from './catalogs.page';

describe('CatalogsPage', () => {
  let component: CatalogsPage;
  let fixture: ComponentFixture<CatalogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
