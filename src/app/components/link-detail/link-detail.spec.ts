import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkDetail } from './link-detail';

describe('LinkDetail', () => {
  let component: LinkDetail;
  let fixture: ComponentFixture<LinkDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
