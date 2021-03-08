import got from 'got'

class ActivityModel {

    private endpoint = "http://www.boredapi.com/api/activity"

    public async getActivity(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing activity API (${result.statusCode})`
        }
        return result.body
    }
}

export default ActivityModel
