import { Routes } from '@angular/router';
import { LinksList } from './components/links-list/links-list';
import { CreateLink } from './components/create-link/create-link';
import { LinkDetail } from './components/link-detail/link-detail';

export const routes: Routes = [
  { path: '', component: LinksList },
  { path: 'create', component: CreateLink },
  { path: 'links/:id', component: LinkDetail },
  { path: '**', redirectTo: '' }
];