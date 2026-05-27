import axios from 'axios';
import type { SearchParams } from '../types';

const api = axios.create({ baseURL: '/api' });

export const searchNews = (params: SearchParams) =>
  api.get('/news/search', { params }).then(r => r.data).catch(err => {
    console.error('Search failed:', err);
    throw err;
  });

export const getNews = (page = 1, pageSize = 20) =>
  api.get('/news', { params: { page, pageSize } }).then(r => r.data).catch(err => {
    console.error('Get news failed:', err);
    throw err;
  });

export const getPlatforms = () =>
  api.get('/platforms').then(r => r.data).catch(err => {
    console.error('Get platforms failed:', err);
    throw err;
  });