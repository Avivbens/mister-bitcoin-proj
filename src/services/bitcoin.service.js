import axios from 'axios'

export const bitcoinService = {
    getRate,

    getMarketPrice,
    getConfirmedTransactions,
}
getRate()

async function getRate(coins) {
    const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
    return coins / res.data
}

async function getMarketPrice() {
    const helper = JSON.parse(sessionStorage.helper || null)?.map(h => h.y)
    if (helper) return helper

    console.log('server fetch')
    const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    sessionStorage.helper = JSON.stringify(res.data.values.slice(75))
    return res.data.values.slice(75).map(h => h.y)
}

async function getConfirmedTransactions() {
    const helper2 = JSON.parse(sessionStorage.helper2 || null)?.map(h => h.y)
    if (helper2) return helper2

    console.log('server fetch')
    const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
    sessionStorage.helper2 = JSON.stringify(res.data.values.slice(75))
    return res.data.values.slice(75).map(h => h.y)
}