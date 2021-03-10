import got from 'got'
import { News } from './INews'

class NewsModel {

    private endpoint = "http://newsapi.org/v2"
    private apikey = process.env.NEWS_API_KEY || ""

    public getNews = async (query: string): Promise<News> => {
        const result = await got<News>(`${this.endpoint}/everything`, { searchParams: { apiKey: this.apikey, q: query }, responseType: 'json'})

        if (result.statusCode != 200) {
            throw `Error accessing news API (${result.statusCode})`
        }

        return result.body
    }

    public getHeadlines = async (query: string): Promise<News> => {
        const result = await got<News>(`${this.endpoint}/top-headlines`, { searchParams: { apiKey: this.apikey, q: query }, responseType: 'json'})

        if (result.statusCode != 200) {
            throw `Error accessing news API (${result.statusCode})`
        }

        return result.body
    }
}

export default NewsModel
