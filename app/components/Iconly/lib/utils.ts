import { sizes, strokes } from './constants';
import { Theme } from './context';

export const isBrowser = typeof window !== 'undefined';

export const getSize = (size: number | 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' = 'medium'): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  return sizes[size];
};

export const getStroke = (stroke: 'light' | 'regular' | 'bold' = 'regular') => strokes[stroke];

export const getOpacity = (primaryColor: string | undefined, secondaryColor: string | undefined) => {
  if (!secondaryColor) {
    return '0.4';
  }
  return primaryColor === secondaryColor ? '0.4' : '1';
};

export const getThemeProp = (
  prop: 'primaryColor' | 'secondaryColor' | 'size' | 'set' | 'stroke',
  theme: Theme,
): Theme[typeof prop] => theme[prop];
