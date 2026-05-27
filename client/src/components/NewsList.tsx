import { NewsItem, ThemeColors } from '../types';

const platformNames: Record<string, string> = {
  JueJin: '掘金',
  Csdn: 'CSDN',
  CnBlog: '博客园',
  ItHome: 'IT之家',
  _36kr: '36氪',
};

interface Props {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  colors: ThemeColors;
  onPage: (page: number) => void;
}

export default function NewsList({ items, total, page, pageSize, colors, onPage }: Props) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div style={{ padding: '1rem 1.5rem' }}>
      <div style={{ fontSize: '0.8rem', color: colors.textSecondary, marginBottom: '1rem' }}>
        共 {total} 条结果
      </div>
      {items.map(item => (
        <div key={item.id} style={{
          padding: '1rem',
          marginBottom: '0.75rem',
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          background: colors.card,
          boxShadow: colors.glow,
          transition: 'all 0.2s ease',
        }}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
            color: colors.text,
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            lineHeight: 1.5,
          }}>
            {item.title}
          </a>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              background: colors.tagBg,
              color: colors.tagText,
              fontWeight: 600,
            }}>
              {platformNames[item.platform] || item.platform}
            </span>
            <span style={{ fontSize: '0.75rem', color: colors.textSecondary }}>
              {item.publishDate}
            </span>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div style={{ padding: '3rem', textAlign: 'center', color: colors.textSecondary, fontSize: '1rem' }}>
          暂无数据
        </div>
      )}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPage(i + 1)}
              disabled={page === i + 1}
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '6px',
                border: 'none',
                background: page === i + 1 ? colors.paginationActive : colors.paginationBg,
                color: page === i + 1 ? colors.bg : colors.paginationText,
                cursor: page === i + 1 ? 'default' : 'pointer',
                fontWeight: page === i + 1 ? 700 : 400,
                fontSize: '0.8rem',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
