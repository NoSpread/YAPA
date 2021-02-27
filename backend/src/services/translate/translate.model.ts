import got from 'got'

class TranslateModel {

    private endpoint = "https://libretranslate.com/translate"

    public async postTranslate(query: string, source: string, target: string): Promise < string > {

        const requestObj = {
            q: query,
            source: source,
            target: target
        }
        const result = await got.post(this.endpoint, {
            json: requestObj
        })

        console.log(result)

        if (result.statusCode != 200) {
            throw `Error accessing joke API (${result.statusCode})`
        }

        const jsonTranslate = JSON.parse(result.body)

        if (jsonTranslate.error) {
            throw jsonTranslate.error
        }

        return jsonTranslate.translatedText
    }
}

export default TranslateModel