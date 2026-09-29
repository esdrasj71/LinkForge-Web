import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-create-link',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="page">
      <a mat-button routerLink="/" class="back-link">
        <mat-icon>arrow_back</mat-icon>
        Back to links
      </a>

      <div class="card">
        <h1>Create a Link</h1>
        <p class="subtitle">Paste a URL and we'll generate a short code for it.</p>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Original URL</mat-label>
          <input
            matInput
            [(ngModel)]="originalUrl"
            placeholder="https://example.com"
            (keyup.enter)="create()"
            [disabled]="loading" />
        </mat-form-field>

        <div *ngIf="error" class="error">
          <mat-icon>error</mat-icon>
          {{ error }}
        </div>

        <div class="actions">
          <a mat-button routerLink="/">Cancel</a>
          <button
            mat-raised-button
            color="primary"
            (click)="create()"
            [disabled]="loading || !originalUrl">
            {{ loading ? 'Creating...' : 'Create Link' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 640px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .back-link {
      margin-bottom: 1rem;
      color: #64748b;
    }
    .card {
      background: #fff;
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }
    .subtitle {
      color: #64748b;
      margin: 0 0 2rem;
      font-size: 0.95rem;
    }
    .full-width {
      width: 100%;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    .actions button[mat-raised-button] {
      height: 44px;
      padding: 0 1.5rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    .error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #b91c1c;
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
  `]
})
export class CreateLink {
  originalUrl = '';
  loading = false;
  error = '';

  constructor(
    private linkService: LinkService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  create(): void {
    if (!this.originalUrl.trim()) return;

    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.linkService.create(this.originalUrl.trim()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to create link. Check the URL and try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}