export interface Joke {
    error: boolean;
    category: string;
    type: string;
    setup ? : string;
    delivery ? : string;
    flags: Flags;
    id: number;
    safe: boolean;
    lang: string;
    joke ? : string;
}

export interface Flags {
    nsfw: boolean;
    racist: boolean;
    sexist: boolean;
    religious: boolean;
    political: boolean;
    explicit: boolean;
}