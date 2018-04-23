export const PRODUCTION = process.env.NODE_ENV === 'production'
export const ROOT = PRODUCTION ? './www/' : './'
