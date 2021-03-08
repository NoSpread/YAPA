import got from 'got'

class NewsModel {

    private endpoint = "http://newsapi.org/v2/everything"

    public async getNews(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing news API (${result.statusCode})`
        }
        return result.body
    }
}

export default NewsModel
