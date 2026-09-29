import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksList } from './links-list';

describe('LinksList', () => {
  let component: LinksList;
  let fixture: ComponentFixture<LinksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksList],
    }).compileComponents();

    fixture = TestBed.createComponent(LinksList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
