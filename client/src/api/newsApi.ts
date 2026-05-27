import axios from 'axios';
import type { SearchParams } from '../types';

const api = axios.create({ baseURL: '/api' });

export const searchNews = (params: SearchParams) =>
  api.get('/news/search', { params }).then(r => r.data);

export const getNews = (page = 1, pageSize = 20) =>
  api.get('/news', { params: { page, pageSize } }).then(r => r.data);

export const getPlatforms = () =>
  api.get('/platforms').then(r => r.data);