import got from 'got'

class TransitModel {

    private endpoint = "http://dev.virtualearth.net/REST/v1/Routes/Transit"

    public async getTransit(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing transit API (${result.statusCode})`
        }
        return result.body
    }
}

export default TransitModel
