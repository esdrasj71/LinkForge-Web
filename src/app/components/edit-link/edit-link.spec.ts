import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLink } from './edit-link';

describe('EditLink', () => {
  let component: EditLink;
  let fixture: ComponentFixture<EditLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLink],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
