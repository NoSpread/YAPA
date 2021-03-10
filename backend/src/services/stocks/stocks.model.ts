import got from 'got'
import { Stock } from './IStocks'

class StocksModel {

    private endpoint = "https://finnhub.io/api/v1/quote"
    private apikey = process.env.FINNHUB_API_KEY || ""

    public getStocks = async (symbol: string): Promise<Stock> => {
        const result = await got<Stock>(this.endpoint, {
            searchParams: {
                token: this.apikey,
                symbol: symbol
            },
            responseType: 'json'
        })

        if (result.statusCode != 200) {
            throw new Error(`Error accessing stock API (${result.statusCode})`)
        }

        return result.body
    }
}

export default StocksModel