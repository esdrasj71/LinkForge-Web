import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Link {
  id: number;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt: string | null;
  isDeleted: boolean;
  totalClicks: number;
}

export interface PagedResult {
  total: number;
  page: number;
  pageSize: number;
  items: Link[];
}

export interface ClickByDay {
  date: string;
  count: number;
}

export interface TopReferrer {
  referrer: string;
  count: number;
}

export interface Analytics {
  linkId: number;
  shortCode: string;
  totalClicks: number;
  clicksByDay: ClickByDay[];
  topReferrers: TopReferrer[];
}

@Injectable({ providedIn: 'root' })
export class LinkService {
  private readonly baseUrl = `${environment.apiUrl}/api/links`;

  constructor(private http: HttpClient) {}

  getAll(page = 1, pageSize = 20): Observable<PagedResult> {
    return this.http.get<PagedResult>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getById(id: number): Observable<Link> {
    return this.http.get<Link>(`${this.baseUrl}/${id}`);
  }

  create(originalUrl: string): Observable<Link> {
    return this.http.post<Link>(this.baseUrl, { originalUrl });
  }

  update(id: number, originalUrl?: string, expiresAt?: string): Observable<Link> {
    return this.http.put<Link>(`${this.baseUrl}/${id}`, { originalUrl, expiresAt });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAnalytics(id: number): Observable<Analytics> {
    return this.http.get<Analytics>(`${this.baseUrl}/${id}/analytics`);
  }
}