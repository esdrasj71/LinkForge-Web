import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { LinkService, Analytics } from '../../services/link.service';

@Component({
  selector: 'app-link-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxChartsModule
  ],
  template: `
    <div class="container">
      <a mat-button routerLink="/" class="back-link">
        <mat-icon>arrow_back</mat-icon>
        Back to links
      </a>

      <div *ngIf="loading" class="center">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="!loading && analytics">
        <div class="detail-header">
          <div>
            <span class="code-label">Short Code</span>
            <div class="code-value">/{{ analytics.shortCode }}</div>
          </div>
          <a
            mat-stroked-button
            [href]="'https://linkforge-api.onrender.com/' + analytics.shortCode"
            target="_blank"
            rel="noopener noreferrer">
            <mat-icon>open_in_new</mat-icon>
            Visit
          </a>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ analytics.totalClicks }}</div>
            <div class="stat-label">Total Clicks</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ analytics.clicksByDay.length }}</div>
            <div class="stat-label">Days Active</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ analytics.topReferrers.length }}</div>
            <div class="stat-label">Referrers</div>
          </div>
        </div>

        <h2>Clicks Over Time</h2>
        <div class="chart-wrapper">
          <div *ngIf="chartData[0].series.length === 0" class="empty-chart">
            No clicks yet. Share your link to see activity here.
          </div>
          <ngx-charts-area-chart
            *ngIf="chartData[0].series.length > 0"
            [results]="chartData"
            [scheme]="colorScheme"
            [xAxis]="true"
            [yAxis]="true"
            [showXAxisLabel]="false"
            [showYAxisLabel]="false"
            [autoScale]="true"
            [gradient]="true"
            [animations]="true"
            [roundDomains]="true"
            [tooltipDisabled]="false">
          </ngx-charts-area-chart>
        </div>

        <h2>Top Referrers</h2>
        <div *ngIf="analytics.topReferrers.length === 0" class="empty-chart">
          No referrer data yet.
        </div>
        <ul *ngIf="analytics.topReferrers.length > 0" class="referrers">
          <li *ngFor="let ref of analytics.topReferrers">
            <span class="referrer-name">{{ ref.referrer }}</span>
            <span class="referrer-count">{{ ref.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 960px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .back-link {
      margin-bottom: 1rem;
      color: #64748b;
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #fff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .code-label {
      display: block;
      font-size: 0.7rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.35rem;
      font-weight: 600;
    }
    .code-value {
      font-family: var(--font-mono);
      font-size: 1.75rem;
      color: #1d4ed8;
      font-weight: 500;
    }
    h2 {
      font-size: 1.15rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin: 2rem 0 1rem;
      color: #0f172a;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
    .stat-card {
      background: #fff;
      border-radius: 12px;
      padding: 1.75rem;
      text-align: center;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .stat-value {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
      line-height: 1;
    }
    .stat-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 0.75rem;
      font-weight: 600;
    }
    .chart-wrapper {
      background: #fff;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    .empty-chart {
      padding: 3rem 1rem;
      text-align: center;
      color: #94a3b8;
      font-size: 0.9rem;
    }
    .referrers {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .referrers li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.875rem 1.25rem;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 0.5rem;
      border: 1px solid #e2e8f0;
    }
    .referrer-name {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: #475569;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .referrer-count {
      font-weight: 700;
      color: #1d4ed8;
      font-size: 0.95rem;
    }
    .center {
      display: flex;
      justify-content: center;
      padding: 3rem;
    }
  `]
})
export class LinkDetail implements OnInit {
  analytics?: Analytics;
  chartData: any[] = [{ name: 'Clicks', series: [] }];
  loading = true;

  colorScheme: Color = {
    name: 'linkforge',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3b82f6', '#8b5cf6', '#06b6d4']
  };

  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.linkService.getAnalytics(id).subscribe({
      next: (analytics) => {
        this.analytics = analytics;
        this.chartData = [{
          name: 'Clicks',
          series: analytics.clicksByDay
            .map(d => ({
              name: new Date(d.date).toLocaleDateString(),
              value: d.count
            }))
            .reverse()
        }];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load analytics:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}