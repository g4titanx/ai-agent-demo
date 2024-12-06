interface ImportMetaEnv {
  readonly VITE_XAI_API_KEY: string
  readonly VITE_NETWORK_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}