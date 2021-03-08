import got from 'got'

class QuizModel {

    private endpoint = "https://opentdb.com/api.php"

    public async getQuiz(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing quiz API (${result.statusCode})`
        }
        return result.body
    }
}

export default QuizModel
