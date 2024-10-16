import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestoesComponent } from './questoes.component';
import { QuestoesModule } from '../questoes.module';

describe('QuestoesComponent', () => {
  let component: QuestoesComponent;
  let fixture: ComponentFixture<QuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestoesComponent ],
      imports:[QuestoesModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
