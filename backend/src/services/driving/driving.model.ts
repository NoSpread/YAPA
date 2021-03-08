import got from 'got'

class DrivingModel {

    private endpoint = "http://dev.virtualearth.net/REST/v1/Routes/Driving"

    public async getDriving(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing driving API (${result.statusCode})`
        }
        return result.body
    }
}

export default DrivingModel
