const PRODUCTION = process.env.NODE_ENV === 'production'
const BASE = PRODUCTION ? './www/' : './'

module.exports = {
    PRODUCTION,
    BASE
}
