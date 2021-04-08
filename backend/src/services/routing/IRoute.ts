export interface Route {
    authenticationResultCode: string;
    brandLogoUri: string;
    copyright: string;
    resourceSets: ResourceSet[];
    statusCode: number;
    statusDescription: string;
    traceId: string;
}

export interface ResourceSet {
    estimatedTotal: number;
    resources: Resource[];
}

export interface Resource {
    __type: string;
    bbox: number[];
    id: string;
    distanceUnit: string;
    durationUnit: string;
    routeLegs: RouteLeg[];
    trafficCongestion: TrafficCongestion;
    trafficDataUsed: TrafficCongestion;
    travelDistance: number;
    travelDuration: number;
    travelDurationTraffic: number;
    travelMode: Mode;
}

export interface RouteLeg {
    actualEnd: ActualEnd;
    actualStart: ActualEnd;
    alternateVias: any[];
    cost: number;
    description: string;
    endLocation: Location;
    itineraryItems: ItineraryItem[];
    routeRegion: string;
    routeSubLegs: RouteSubLeg[];
    startLocation: Location;
    travelDistance: number;
    travelDuration: number;
    travelMode: Mode;
}

export interface ActualEnd {
    type: Type;
    coordinates: number[];
}

export enum Type {
    Point = "Point",
}

export interface Location {
    bbox: number[];
    name: string;
    point: ActualEnd;
    address: Address;
    confidence: string;
    entityType: string;
    geocodePoints: GeocodePoint[];
    matchCodes: string[];
}

export interface Address {
    adminDistrict: string;
    countryRegion: string;
    formattedAddress: string;
    locality: string;
}

export interface GeocodePoint {
    type: Type;
    coordinates: number[];
    calculationMethod: string;
    usageTypes: string[];
}

export interface ItineraryItem {
    compassDirection: CompassDirection;
    details: Detail[];
    exit: string;
    iconType: IconType;
    instruction: Instruction;
    isRealTimeTransit: boolean;
    maneuverPoint: ActualEnd;
    realTimeTransitDelay: number;
    sideOfStreet: SideOfStreet;
    tollZone: string;
    towardsRoadName ? : string;
    transitTerminus: string;
    travelDistance: number;
    travelDuration: number;
    travelMode: Mode;
    signs ? : string[];
    warnings ? : Warning[];
    hints ? : Hint[];
}

export enum CompassDirection {
    East = "east",
        North = "north",
        Northeast = "northeast",
        Northwest = "northwest",
        South = "south",
        Southeast = "southeast",
        Southwest = "southwest",
        West = "west",
}

export interface Detail {
    compassDegrees ? : number;
    endPathIndices: number[];
    maneuverType: string;
    mode: Mode;
    names ? : string[];
    roadType: RoadType;
    startPathIndices: number[];
    locationCodes ? : string[];
    roadShieldRequestParameters ? : RoadShieldRequestParameters;
}

export enum Mode {
    Driving = "Driving",
        Walking = "Walking",
        Transit = "Transit"
}

export interface RoadShieldRequestParameters {
    bucket: number;
    shields: Shield[];
}

export interface Shield {
    labels: string[];
    roadShieldType: number;
}

export enum RoadType {
    Arterial = "Arterial",
        Ferry = "Ferry",
        Highway = "Highway",
        LimitedAccessHighway = "LimitedAccessHighway",
        MajorRoad = "MajorRoad",
        Ramp = "Ramp",
        Street = "Street",
}

export interface Hint {
    hintType: string;
    text: string;
}

export enum IconType {
    Auto = "Auto",
}

export interface Instruction {
    formattedText: null;
    maneuverType: string;
    text: string;
}

export enum SideOfStreet {
    Unknown = "Unknown",
}

export interface Warning {
    origin ? : string;
    severity: TrafficCongestion;
    text: string;
    warningType: WarningType;
    to ? : string;
    endTime ? : Time;
    startTime ? : Time;
}

export interface Time {
    DateTime: string;
    OffsetMinutes: number;
}

export enum TrafficCongestion {
    Minor = "Minor",
        Moderate = "Moderate",
        None = "None",
        Serious = "Serious",
}

export enum WarningType {
    Accident = "Accident",
        AdminDivisionChange = "AdminDivisionChange",
        BlockedRoad = "BlockedRoad",
        CheckTimetable = "CheckTimetable",
        Congestion = "Congestion",
        CountryChange = "CountryChange",
        DisabledVehicle = "DisabledVehicle",
        GateAccess = "GateAccess",
        GetOffTransit = "GetOffTransit",
        GetOnTransit = "GetOnTransit",
        IllegalUTurn = "IllegalUTurn",
        MassTransit = "MassTransit",
        Miscellaneous = "Miscellaneous",
        NoIncident = "NoIncident",
        None = "None",
        Other = "Other",
        OtherNews = "OtherNews",
        OtherTrafficIncidents = "OtherTrafficIncidents",
        PlannedEvents = "PlannedEvents",
        PrivateRoad = "PrivateRoad",
        RestrictedTurn = "RestrictedTurn",
        RoadClosures = "RoadClosures",
        RoadHazard = "RoadHazard",
        ScheduledConstruction = "ScheduledConstruction",
        SeasonalClosures = "SeasonalClosures",
        Tollbooth = "Tollbooth",
        TollRoad = "TollRoad",
        TollZoneEnter = "TollZoneEnter",
        TollZoneExit = "TollZoneExit",
        TrafficFlow = "TrafficFlow",
        TransitLineChange = "TransitLineChange",
        UnpavedRoad = "UnpavedRoad",
        Weather = "Weather"
}

export interface RouteSubLeg {
    endWaypoint: Waypoint;
    startWaypoint: Waypoint;
    travelDistance: number;
    travelDuration: number;
}

export interface Waypoint {
    type: Type;
    coordinates: number[];
    description: string;
    isVia: boolean;
    locationIdentifier: string;
    routePathIndex: number;
}

export interface RouteOutput {
    travelDuration: number,
        travelDurationTraffic: number,
        travelDistance: number
}

export enum TimeType {
    Arrival = " Arrival",
        Departure = "Departure",
        LastAvailable = "LastAvailable"
}