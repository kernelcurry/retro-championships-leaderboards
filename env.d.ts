/// <reference types="vite/client" />
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_QUALIFIERS_SPREADSHEET_ID: string;
  readonly VITE_FINALS_SPREADSHEET_ID: string;
  readonly VITE_GOOGLE_SHEETS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
