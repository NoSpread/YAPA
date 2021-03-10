import got from 'got'
import { Translation, TranslationOutput } from './ITranslate'

class TranslateModel {

    private endpoint = "https://libretranslate.com/translate"

    public async postTranslate(query: string, source: string, target: string): Promise<TranslationOutput> {

        const requestObj = {
            q: query,
            source: source,
            target: target
        }
        const result = await got.post<Translation>(this.endpoint, {
            json: requestObj,
            responseType: "json"
        })

        if (result.statusCode != 200) {
            throw new Error(`Error accessing translate API (${result.statusCode})`)
        }

        const jsonTranslate = result.body
        const output: TranslationOutput = {
            input: query,
            output: jsonTranslate.translatedText
        }
        
        return output
    }
}

export default TranslateModel