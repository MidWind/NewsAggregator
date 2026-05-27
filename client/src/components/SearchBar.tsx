import { useState, useEffect } from 'react';
import { getPlatforms } from '../api/newsApi';

interface Props {
  onSearch: (keyword: string, platform: string, dateFrom: string, dateTo: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [platforms, setPlatforms] = useState<{id: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlatforms().then(setPlatforms).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <input placeholder="关键词搜索" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <select value={platform} onChange={e => setPlatform(e.target.value)} disabled={loading}>
        <option value="">全部平台</option>
        {loading ? <option disabled>加载中...</option> : platforms.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
      </select>
      <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
      <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
      <button onClick={() => onSearch(keyword, platform, dateFrom, dateTo)}>搜索</button>
    </div>
  );
}