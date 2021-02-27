import got from 'got'

class FortuneModel {

    private endpoint = "https://api.justyy.workers.dev/api/fortune"

    public async getFortune(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing fortune API (${result.statusCode})`
        }
        return result.body
    }
}

export default FortuneModel
