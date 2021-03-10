export interface Sightseeing {
    xid:       string;
    name:      string;
    dist:      number;
    rate:      number;
    wikidata?: string;
    kinds:     string;
    point:     Point;
    osm?:      string;
}

export interface Point {
    lon: number;
    lat: number;
}

export interface SError {
    error: string;
}


export interface Geoname {
    name?:       string;
    country?:    string;
    lat?:        number;
    lon?:        number;
    population?: number;
    timezone?:   string;
    status:      string;
    error?:      GError;
}

export interface GError {
    status: string,
    error: string
}
