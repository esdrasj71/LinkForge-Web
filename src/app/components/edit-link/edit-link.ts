import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LinkService, Link } from '../../services/link.service';

@Component({
  selector: 'app-edit-link',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page">
      <a mat-button [routerLink]="['/links', linkId]" class="back-link">
        <mat-icon>arrow_back</mat-icon>
        Back to details
      </a>

      <div class="card">
        <h1>Edit Link</h1>
        <p class="subtitle">Update the destination URL or remove expiration.</p>

        <div *ngIf="loading" class="center">
          <mat-spinner diameter="40"></mat-spinner>
        </div>

        <ng-container *ngIf="!loading">
          <div class="code-display">
            <span class="code-label">Short Code</span>
            <span class="code-value">/{{ currentCode }}</span>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Original URL</mat-label>
            <input
              matInput
              [(ngModel)]="originalUrl"
              placeholder="https://example.com"
              (keyup.enter)="save()" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Expiration Date (optional)</mat-label>
            <input
              matInput
              type="datetime-local"
              [(ngModel)]="expiresAt" />
            <mat-hint>Leave empty for a link that never expires.</mat-hint>
          </mat-form-field>

          <div *ngIf="error" class="error">
            <mat-icon>error</mat-icon>
            {{ error }}
          </div>

          <div class="actions">
            <a mat-button [routerLink]="['/links', linkId]">Cancel</a>
            <button
              mat-raised-button
              color="primary"
              (click)="save()"
              [disabled]="saving || !originalUrl">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </ng-container>
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
    .code-display {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.25rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      margin-bottom: 1.5rem;
    }
    .code-label {
      font-size: 0.7rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .code-value {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      color: #1d4ed8;
      font-weight: 500;
    }
    .full-width {
      width: 100%;
      margin-bottom: 0.5rem;
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
    .center {
      display: flex;
      justify-content: center;
      padding: 3rem;
    }
  `]
})
export class EditLink implements OnInit {
  linkId!: number;
  currentCode = '';
  originalUrl = '';
  expiresAt = '';
  loading = true;
  saving = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private linkService: LinkService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.linkId = Number(this.route.snapshot.paramMap.get('id'));

    this.linkService.getById(this.linkId).subscribe({
      next: (link: Link) => {
        this.currentCode = link.shortCode;
        this.originalUrl = link.originalUrl;
        this.expiresAt = this.toLocalDateTimeInput(link.expiresAt);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load link:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (!this.originalUrl.trim()) return;

    this.saving = true;
    this.error = '';
    this.cdr.detectChanges();

    const expiresAtIso = this.expiresAt ? new Date(this.expiresAt).toISOString() : null;

    this.linkService.update(this.linkId, this.originalUrl.trim(), expiresAtIso).subscribe({
      next: () => {
        this.router.navigate(['/links', this.linkId]);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update link.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  private toLocalDateTimeInput(iso: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}