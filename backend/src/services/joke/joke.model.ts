import got from 'got'

class JokeModel {

    private endpoint = "https://v2.jokeapi.dev/joke/Any?lang=de"

    public async getJoke(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing joke API (${result.statusCode})`
        }

        const jsonJoke = JSON.parse(result.body)
        
        if (jsonJoke.error) {
            throw `Error accessing fortune API (${jsonJoke.error})`
        }

        let stringReturn: string
        if (jsonJoke.type === "twopart") {
            stringReturn = `${jsonJoke.setup}\n${jsonJoke.delivery}`
        } else {
            stringReturn = jsonJoke.joke
        }

        return stringReturn
    }
}

export default JokeModel
