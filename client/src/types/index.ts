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

export type Theme = 'cyber' | 'matrix' | 'minimal';

export interface ThemeColors {
  bg: string;
  bgSecondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  card: string;
  glow: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  tagBg: string;
  tagText: string;
  paginationBg: string;
  paginationActive: string;
  paginationText: string;
}

export const themes: Record<Theme, { name: string; colors: ThemeColors }> = {
  cyber: {
    name: '赛博朋克',
    colors: {
      bg: '#0a0a1a',
      bgSecondary: '#111128',
      text: '#e0e0ff',
      textSecondary: '#8888aa',
      accent: '#00d4ff',
      accentHover: '#00b8d9',
      border: '#1a1a3e',
      card: '#12122a',
      glow: '0 0 10px rgba(0,212,255,0.3)',
      inputBg: '#0d0d22',
      inputBorder: '#2a2a5e',
      inputText: '#e0e0ff',
      buttonBg: '#00d4ff',
      buttonText: '#0a0a1a',
      buttonHover: '#00b8d9',
      tagBg: '#1a1a4e',
      tagText: '#00d4ff',
      paginationBg: '#1a1a3e',
      paginationActive: '#00d4ff',
      paginationText: '#e0e0ff',
    },
  },
  matrix: {
    name: '暗夜极客',
    colors: {
      bg: '#0a0f0a',
      bgSecondary: '#0f1a0f',
      text: '#c0ffc0',
      textSecondary: '#5a8a5a',
      accent: '#00ff41',
      accentHover: '#00cc33',
      border: '#1a3a1a',
      card: '#0f1a0f',
      glow: '0 0 10px rgba(0,255,65,0.3)',
      inputBg: '#0a120a',
      inputBorder: '#1a3a1a',
      inputText: '#c0ffc0',
      buttonBg: '#00ff41',
      buttonText: '#0a0f0a',
      buttonHover: '#00cc33',
      tagBg: '#0f2a0f',
      tagText: '#00ff41',
      paginationBg: '#1a3a1a',
      paginationActive: '#00ff41',
      paginationText: '#c0ffc0',
    },
  },
  minimal: {
    name: '极简白',
    colors: {
      bg: '#f8f9fa',
      bgSecondary: '#ffffff',
      text: '#1a1a2e',
      textSecondary: '#6c757d',
      accent: '#2c3e7a',
      accentHover: '#1a2755',
      border: '#dee2e6',
      card: '#ffffff',
      glow: '0 2px 8px rgba(0,0,0,0.08)',
      inputBg: '#ffffff',
      inputBorder: '#ced4da',
      inputText: '#1a1a2e',
      buttonBg: '#2c3e7a',
      buttonText: '#ffffff',
      buttonHover: '#1a2755',
      tagBg: '#e8ecf4',
      tagText: '#2c3e7a',
      paginationBg: '#e9ecef',
      paginationActive: '#2c3e7a',
      paginationText: '#1a1a2e',
    },
  },
};
