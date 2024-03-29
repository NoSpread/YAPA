import got from 'got'

class FortuneModel {

    private endpoint = "https://api.justyy.workers.dev/api/fortune"

    /**
     * Request a fortune from the justyy api
     * @returns A simple fortune string
     */
    public getFortune = async (): Promise < string > => {
        const result = await got(this.endpoint, {
            responseType: 'text'
        })

        if (result.statusCode != 200) {
            throw `Error accessing fortune API (${result.statusCode})`
        }
        return result.body
    }
}

export default FortuneModel