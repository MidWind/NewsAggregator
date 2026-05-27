import { NewsItem } from '../types';

interface Props {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  onPage: (page: number) => void;
}

export default function NewsList({ items, total, page, pageSize, onPage }: Props) {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div style={{ padding: '1rem' }}>
      {items.map(item => (
        <div key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            {item.platform} · {item.publishDate}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>暂无数据</div>
      )}
      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => onPage(i + 1)} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}