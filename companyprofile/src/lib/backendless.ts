const APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID as string | undefined
const API_KEY = import.meta.env.VITE_BACKENDLESS_JS_KEY as string | undefined

export const backendlessReady = Boolean(APP_ID && API_KEY)

let sdk: typeof import('backendless').default | null = null

export async function getBackendless() {
  if (!backendlessReady) return null
  if (!sdk) {
    sdk = (await import('backendless')).default
    sdk.initApp(APP_ID as string, API_KEY as string)
  }
  return sdk
}
