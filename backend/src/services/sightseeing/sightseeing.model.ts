import got from 'got'

class SightseeingModel {

    private endpoint = "http://api.opentripmap.com/0.1/en/places/radius"
	private apikey = process.env.OPENTRIMAP_API_KEY || ""

    public async getSightseeing(lat:string, lon: string, radius: string): Promise<string> {
		const requestObj {
			lat: lat,
			lon: lon,
			radius: radius,
			apikey: apikey
		}

        const result = await got(this.endpoint, requestObj)

        if (result.statusCode != 200) {
            throw `Error accessing sightseeing API (${result.statusCode})`
        }
        return result.body
    }
}

export default SightseeingModel
