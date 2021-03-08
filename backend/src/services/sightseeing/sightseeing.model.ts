import got from 'got'

class SightseeingModel {

    private endpoint = "http://api.opentripmap.com/0.1/en/places/radius"

    public async getSightseeing(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing sightseeing API (${result.statusCode})`
        }
        return result.body
    }
}

export default SightseeingModel
