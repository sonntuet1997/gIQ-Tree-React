export const GOOGLE_CLIENT_ID: string = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '';

if (!GOOGLE_CLIENT_ID) {
  throw new Error('Missing Google Client ID');
}

export const BASE_URL: string = process.env.REACT_APP_BASE_URL ?? '';

if (!BASE_URL) {
  throw new Error('Missing BASE_URL');
}

export const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL ?? window.location.origin;

export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';

export const APP_TITLE: string = process.env.REACT_APP_TITLE ?? '';
