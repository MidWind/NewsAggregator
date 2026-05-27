import { useState, useCallback, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import ThemeSwitcher from './components/ThemeSwitcher';
import { searchNews } from './api/newsApi';
import { NewsItem, Theme, themes, ThemeColors } from './types';

const STORAGE_KEY = 'news-theme';

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme;
    if (saved && themes[saved]) return saved;
  } catch {}
  return 'cyber';
}

export default function App() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const filtersRef = useRef({ keyword: '', platform: '', dateFrom: '', dateTo: '' });
  const colors = themes[theme].colors;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    const root = document.documentElement;
    root.style.setProperty('--bg', colors.bg);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--text', colors.text);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--tag-bg', colors.tagBg);
    root.style.setProperty('--tag-text', colors.tagText);
    document.body.style.background = colors.bg;
    document.body.style.color = colors.text;
  }, [theme, colors]);

  const loadData = useCallback((params: object) => {
    setLoading(true);
    searchNews(params).then((res: any) => {
      setItems(res.data);
      setTotal(res.total);
      setPage(res.page);
    }).finally(() => setLoading(false));
  }, []);

  // Auto-load on mount
  useEffect(() => {
    loadData({ page: 1, pageSize });
  }, [loadData, pageSize]);

  const handleFilterChange = (keyword: string, platform: string, dateFrom: string, dateTo: string) => {
    filtersRef.current = { keyword, platform, dateFrom, dateTo };
    loadData({ keyword, platform, dateFrom, dateTo, page: 1, pageSize });
  };

  const handleKeywordSearch = (keyword: string, platform: string, dateFrom: string, dateTo: string) => {
    filtersRef.current = { keyword, platform, dateFrom, dateTo };
    loadData({ keyword, platform, dateFrom, dateTo, page: 1, pageSize });
  };

  const handlePage = (newPage: number) => {
    const f = filtersRef.current;
    loadData({ ...f, page: newPage, pageSize });
  };

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      transition: 'background 0.3s ease',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: `1px solid ${colors.border}`,
        background: colors.bgSecondary,
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.25rem',
          fontWeight: 700,
          color: colors.accent,
          letterSpacing: '0.05em',
        }}>
          科技热榜聚合（中锋科技）
        </h1>
        <ThemeSwitcher current={theme} onChange={handleThemeChange} />
      </div>
      <SearchBar
        colors={colors}
        onFilterChange={handleFilterChange}
        onKeywordSearch={handleKeywordSearch}
      />
      {loading ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          color: colors.accent,
          fontSize: '1rem',
        }}>
          加载中...
        </div>
      ) : (
        <NewsList
          items={items}
          total={total}
          page={page}
          pageSize={pageSize}
          colors={colors}
          onPage={handlePage}
        />
      )}
    </div>
  );
}
