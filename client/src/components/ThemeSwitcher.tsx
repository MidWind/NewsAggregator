import { Theme, themes } from '../types';

interface Props {
  current: Theme;
  onChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ current, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {(Object.keys(themes) as Theme[]).map(key => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: '0.3rem 0.7rem',
            fontSize: '0.75rem',
            borderRadius: '4px',
            border: current === key ? '1px solid var(--accent)' : '1px solid var(--border)',
            background: current === key ? 'var(--tag-bg)' : 'transparent',
            color: current === key ? 'var(--accent)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: current === key ? 700 : 400,
          }}
        >
          {themes[key].name}
        </button>
      ))}
    </div>
  );
}
