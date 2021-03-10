import got from 'got'
import { Activity } from './IActivity'

class ActivityModel {

    private endpoint = "http://www.boredapi.com/api/activity"

    public async getActivity(): Promise<Activity> {
        const result = await got<Activity>(this.endpoint, {responseType: 'json'})

        if (result.statusCode != 200) {
            throw new Error(`Error accessing activity API (${result.statusCode})`)
        }
        return result.body
    }
}

export default ActivityModel
