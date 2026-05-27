import { useState, useEffect } from 'react';
import { getPlatforms } from '../api/newsApi';
import { ThemeColors } from '../types';

interface Props {
  colors: ThemeColors;
  onFilterChange: (keyword: string, platform: string, dateFrom: string, dateTo: string) => void;
  onKeywordSearch: (keyword: string, platform: string, dateFrom: string, dateTo: string) => void;
}

const platformNames: Record<string, string> = {
  JueJin: '掘金',
  Csdn: 'CSDN',
  CnBlog: '博客园',
  ItHome: 'IT之家',
  _36kr: '36氪',
};

export default function SearchBar({ colors, onFilterChange, onKeywordSearch }: Props) {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [platforms, setPlatforms] = useState<{id: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlatforms().then(setPlatforms).finally(() => setLoading(false));
  }, []);

  const handlePlatformChange = (val: string) => {
    setPlatform(val);
    onFilterChange(keyword, val, dateFrom, dateTo);
  };

  const handleDateFromChange = (val: string) => {
    setDateFrom(val);
    onFilterChange(keyword, platform, val, dateTo);
  };

  const handleDateToChange = (val: string) => {
    setDateTo(val);
    onFilterChange(keyword, platform, dateFrom, val);
  };

  const inputStyle = {
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    border: `1px solid ${colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.inputText,
    fontSize: '0.875rem',
    outline: 'none',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  };

  return (
    <div style={{
      padding: '1rem 1.5rem',
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`,
      background: colors.bgSecondary,
    }}>
      <input
        placeholder="关键词搜索..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onKeywordSearch(keyword, platform, dateFrom, dateTo)}
        style={{ ...inputStyle, flex: '1 1 200px', minWidth: '160px' }}
      />
      <button
        onClick={() => onKeywordSearch(keyword, platform, dateFrom, dateTo)}
        style={{
          padding: '0.5rem 1.25rem',
          borderRadius: '6px',
          border: 'none',
          background: colors.buttonBg,
          color: colors.buttonText,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        搜索
      </button>
      <select value={platform} onChange={e => handlePlatformChange(e.target.value)} disabled={loading} style={selectStyle}>
        <option value="">全部平台</option>
        {platforms.map(p => (
          <option key={p.id} value={p.id}>{platformNames[p.id] || p.id}</option>
        ))}
      </select>
      <input type="date" value={dateFrom} onChange={e => handleDateFromChange(e.target.value)} style={inputStyle} />
      <span style={{ color: colors.textSecondary }}>至</span>
      <input type="date" value={dateTo} onChange={e => handleDateToChange(e.target.value)} style={inputStyle} />
    </div>
  );
}
