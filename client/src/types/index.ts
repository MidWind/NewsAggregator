export interface NewsItem {
  id: number;
  title: string;
  url: string;
  platform: string;
  publishDate: string;
}

export interface SearchParams {
  keyword?: string;
  platform?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}