import { Routes } from '@angular/router';
import { LinksList } from './components/links-list/links-list';
import { CreateLink } from './components/create-link/create-link';
import { LinkDetail } from './components/link-detail/link-detail';
import { EditLink } from './components/edit-link/edit-link';

export const routes: Routes = [
  { path: '', component: LinksList },
  { path: 'create', component: CreateLink },
  { path: 'links/:id/edit', component: EditLink },   
  { path: 'links/:id', component: LinkDetail },
  { path: '**', redirectTo: '' }
];