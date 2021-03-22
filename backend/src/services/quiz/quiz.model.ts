import got from 'got'
import { Quiz } from './IQuiz'

class QuizModel {

    private endpoint = "https://opentdb.com/api.php"

    /**
     * Request a quiz from opentdb
     * @param amount Amount of quiz to get
     * @returns A quiz object
     */
    public async getQuiz(amount: string): Promise<Quiz> {
        const result = await got<Quiz>(this.endpoint, {searchParams: { amount: amount }, responseType: 'json'})

        if (result.statusCode != 200) {
            throw new Error(`Error accessing quiz API (${result.statusCode})`)
        }
        return result.body
    }
}

export default QuizModel
