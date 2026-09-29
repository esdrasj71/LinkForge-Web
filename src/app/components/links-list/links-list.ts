import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LinkService, Link } from '../../services/link.service';

@Component({
  selector: 'app-links-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Short links, <span class="accent">real-time analytics</span>
        </h1>
        <p class="hero-subtitle">
          Create short links, track every click, and see what's working.
        </p>
        <a mat-raised-button color="primary" routerLink="/create" class="hero-cta">
          <mat-icon>add</mat-icon>
          Create your first link
        </a>
      </div>
    </section>

    <div class="container">
      <div class="section-header">
        <h2>Your Links</h2>
        <span class="link-count" *ngIf="links.length > 0">{{ links.length }} total</span>
      </div>

      <div *ngIf="loading" class="center">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="!loading && links.length === 0" class="empty">
        <mat-icon>link_off</mat-icon>
        <p>No links yet. Create your first one!</p>
      </div>

      <table *ngIf="!loading && links.length > 0" mat-table [dataSource]="links">
        <ng-container matColumnDef="shortCode">
          <th mat-header-cell *matHeaderCellDef>Short Code</th>
          <td mat-cell *matCellDef="let link">
            <a [routerLink]="['/links', link.id]" class="code-link">
              /{{ link.shortCode }}
            </a>
          </td>
        </ng-container>

        <ng-container matColumnDef="originalUrl">
          <th mat-header-cell *matHeaderCellDef>Destination</th>
          <td mat-cell *matCellDef="let link" class="url-cell">{{ link.originalUrl }}</td>
        </ng-container>

        <ng-container matColumnDef="totalClicks">
          <th mat-header-cell *matHeaderCellDef>Clicks</th>
          <td mat-cell *matCellDef="let link">
            <span class="click-count">{{ link.totalClicks }}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef>Created</th>
          <td mat-cell *matCellDef="let link">{{ link.createdAt | date:'short' }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let link">
            <button mat-icon-button color="warn" (click)="deleteLink(link.id)" aria-label="Delete link">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #fff;
      padding: 4rem 2rem;
      text-align: center;
    }
    .hero-content {
      max-width: 700px;
      margin: 0 auto;
    }
    .hero-title {
      font-size: 2.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin: 0 0 1rem;
      line-height: 1.15;
    }
    .hero-title .accent {
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-subtitle {
      font-size: 1.1rem;
      color: #cbd5e1;
      margin: 0 0 2rem;
    }
    .hero-cta {
      height: 48px;
      padding: 0 1.5rem;
      font-size: 1rem;
    }
    .container {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
    }
    .section-header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
    .link-count {
      color: #64748b;
      font-size: 0.85rem;
    }
    table {
      width: 100%;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    th.mat-mdc-header-cell {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    td.mat-mdc-cell, th.mat-mdc-header-cell {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #f1f5f9;
    }
    tr.mat-mdc-row:hover {
      background: #f8fafc;
      transition: background 0.15s;
    }
    .code-link {
      display: inline-block;
      padding: 0.35rem 0.75rem;
      background: #eff6ff;
      color: #1d4ed8;
      border-radius: 6px;
      font-weight: 500;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      text-decoration: none;
    }
    .code-link:hover {
      background: #dbeafe;
    }
    .click-count {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: #f0fdf4;
      color: #15803d;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.85rem;
    }
    .url-cell {
      color: #64748b;
      font-size: 0.9rem;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .center {
      display: flex;
      justify-content: center;
      padding: 3rem;
    }
    .empty {
      text-align: center;
      padding: 4rem 2rem;
      color: #888;
    }
    .empty mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
    }
  `]
})
export class LinksList implements OnInit {
  links: Link[] = [];
  loading = true;
  displayedColumns = ['shortCode', 'originalUrl', 'totalClicks', 'createdAt', 'actions'];

  constructor(
    private linkService: LinkService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLinks();
  }

  loadLinks(): void {
    this.loading = true;
    this.linkService.getAll().subscribe({
      next: (result) => {
        this.links = result.items;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load links:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteLink(id: number): void {
    if (!confirm('Delete this link? This cannot be undone.')) return;

    this.linkService.delete(id).subscribe({
      next: () => this.loadLinks(),
      error: (err) => console.error('Failed to delete:', err)
    });
  }
}