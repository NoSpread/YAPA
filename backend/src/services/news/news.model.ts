import got from 'got'
import {
    News
} from './INews'

class NewsModel {

    private endpoint = "http://newsapi.org/v2"
    private apikey = process.env.NEWS_API_KEY || ""

    /**
     * Find the current news about a topic using a query
     * @param query A keyword to find news
     * @returns News object
     */
    public getNews = async (query: string): Promise < News > => {
        const result = await got < News > (`${this.endpoint}/everything`, {
            searchParams: {
                apiKey: this.apikey,
                q: query
            },
            responseType: 'json'
        })

        if (result.statusCode != 200) {
            throw `Error accessing news API (${result.statusCode})`
        }

        return result.body
    }

    /**
     * Find the current headlines about a topic using a query
     * @param query A keyword to find new headlines
     * @returns News Object
     */
    public getHeadlines = async (query: string): Promise < News > => {
        const result = await got < News > (`${this.endpoint}/top-headlines`, {
            searchParams: {
                apiKey: this.apikey,
                q: query
            },
            responseType: 'json'
        })

        if (result.statusCode != 200) {
            throw `Error accessing news API (${result.statusCode})`
        }

        return result.body
    }
}

export default NewsModel