import { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import { searchNews } from './api/newsApi';
import { NewsItem } from './types';

export default function App() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback((params: object) => {
    setLoading(true);
    searchNews(params).then((res: any) => {
      setItems(res.data);
      setTotal(res.total);
      setPage(res.page);
    }).finally(() => setLoading(false));
  }, []);

  const handleSearch = (keyword: string, platform: string, dateFrom: string, dateTo: string) => {
    loadData({ keyword, platform, dateFrom, dateTo, page: 1, pageSize });
  };

  const handlePage = (newPage: number) => {
    setPage(newPage);
    loadData({ page: newPage, pageSize });
  };

  return (
    <div>
      <h1 style={{ padding: '1rem' }}>科技热榜聚合</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? <div style={{ padding: '2rem', textAlign: 'center' }}>加载中...</div> : (
        <NewsList items={items} total={total} page={page} pageSize={pageSize} onPage={handlePage} />
      )}
    </div>
  );
}