import got from 'got'
import { Route, RouteOutput, Mode, TimeType} from './IRoute'

class RouteModel {

    private endpoint = "http://dev.virtualearth.net/REST/v1/Routes/"
    private apikey = process.env.BING_API_KEY || ""

    public getRoute = async (start: string, end: string, method: Mode, timeType?: TimeType, dateTime?: string): Promise<RouteOutput> => {

        const searchParams = timeType && dateTime ? {
            key: this.apikey,
            "wp.0": start,
            "wp.1": end,
            avoid: "minimizeTolls",
            timeType: timeType,
            dateTime: dateTime
        } : {
            key: this.apikey,
            "wp.0": start,
            "wp.1": end,
            avoid: "minimizeTolls"
        }

        const result = await got<Route>(this.endpoint + method, {
            searchParams: searchParams,
            responseType: 'json'
        })

        if (result.statusCode != 200) {
            throw new Error(`Error accessing driving API (${result.statusCode})`)
        }

        const route = result.body
        const { travelDuration, travelDurationTraffic, travelDistance } = route.resourceSets[0].resources[0]
        const routeOut: RouteOutput = {
            travelDuration: travelDuration,
            travelDurationTraffic: travelDurationTraffic,
            travelDistance: travelDistance
        }

        return routeOut
    }
}

export default RouteModel