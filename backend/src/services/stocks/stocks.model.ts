import got from 'got'

class StocksModel {

    private endpoint = "https://finnhub.io/api/v1/quote"
    private apikey = process.env.FINNHUB_API_KEY || ""

    public async getStocks(symbol: string): Promise<string> {
        const result = await got(this.endpoint, {searchParams: {token: this.apikey, symbol: symbol}})

        if (result.statusCode != 200) {
            throw `Error accessing stock API (${result.statusCode})`
        }

        const jsonStock = JSON.parse(result.body)
        return jsonStock
    }
}

export default StocksModel
