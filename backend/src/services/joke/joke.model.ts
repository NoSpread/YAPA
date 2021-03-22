import got from 'got'
import { Joke } from './IJoke'
class JokeModel {

    private endpoint = "https://v2.jokeapi.dev/joke/Any?lang=de"

    /**
     * Request a new joke from the jokeapi
     * @returns Joke Object
     */
    public getJoke = async (): Promise<Joke> => {
        const result = await got<Joke>(this.endpoint, {responseType: 'json'})

        if (result.statusCode != 200) {
            throw new Error(`Error accessing joke API (${result.statusCode})`)
        }

        const joke = result.body
        
        if (joke.error) {
            throw new Error(`Error accessing joke API (${joke.error})`)
        }

        return joke
    }
}

export default JokeModel
