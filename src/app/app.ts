import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <a routerLink="/" class="brand">
          <span class="brand-mark">LF</span>
          <span class="brand-text">LinkForge</span>
        </a>
        <nav class="nav">
          <a routerLink="/" class="nav-link">Links</a>
          <a routerLink="/create" class="nav-link nav-link-primary">New Link</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      background: #f8fafc;
    }
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      height: 64px;
      background: #0f172a;
      color: #fff;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: #fff;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .brand-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      font-weight: 800;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
    }
    .brand-text {
      letter-spacing: -0.02em;
    }
    .nav {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .nav-link {
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.15s;
    }
    .nav-link:hover {
      color: #fff;
      background: rgba(255,255,255,0.08);
    }
    .nav-link-primary {
      background: #3b82f6;
      color: #fff;
    }
    .nav-link-primary:hover {
      background: #2563eb;
    }
  `]
})
export class App {}