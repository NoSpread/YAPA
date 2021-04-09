import got from 'got'
import {
    Geoname,
    Sightseeing,
    SError
} from './ISightseeing'

class SightseeingModel {

    private endpoint = "https://api.opentripmap.com/0.1/en/places/"
    private apikey = process.env.OPENTRIMAP_API_KEY || ""

    /**
     * This function searches for the sighseeings in a city
     * @param geoname A geoname is a name of a city, village or location
     * @param radius The radius to search sightseeings
     * @returns An array of sightseeings
     */
    public getGeoname = async (geoname: string, radius: string): Promise < Sightseeing[] > => {

        const result = await got < Geoname > (this.endpoint + "geoname", {
            searchParams: {
                apikey: this.apikey,
                format: "json",
                name: geoname
            },
            responseType: 'json'
        })

        if (result.statusCode != 200) {
            throw new Error(`Error accessing sightseeing API (${result.statusCode})`)
        }

        if (result.body.error) {
            throw new Error(`Error accessing sightseeing API (${result.body.error.status})`)
        }

        const {
            lat,
            lon
        } = result.body

        if (lat && lon) {
            try {
                const sightseeings = await this.getSightseeing(lon, lat, radius)
                return sightseeings
            } catch (err) {
                throw err
            }
        } else {
            throw new Error(`Error accessing sightseeing API (Missing Lat / Lon)`)
        }
    }

    /**
     * Subfunction of getGeoname(), uses the coordinates to find sightseeings
     * @param lon longtitude
     * @param lat latitude
     * @param radius Radius to search for sightseeings
     * @returns Array of sightseeings
     */
    private getSightseeing = async (lon: number, lat: number, radius: string): Promise < Sightseeing[] > => {
        const result = await got < Sightseeing[] | SError > (this.endpoint + "radius", {
            searchParams: {
                apikey: this.apikey,
                format: "json",
                lon: lon,
                lat: lat,
                radius: radius
            },
            responseType: 'json'
        })

        if (result.statusCode != 200) {
            throw new Error(`Error accessing sightseeing API (${result.statusCode})`)
        }

        const isSightseeing = (sightseeing: Sightseeing[] | SError): sightseeing is Sightseeing[] => {
            return true
        }

        const response = result.body
        if (isSightseeing(response)) {
            return response
        } else {
            throw new Error(`Error accessing sightseeing API (${response.error})`)
        }

    }
}

export default SightseeingModel