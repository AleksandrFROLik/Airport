export interface IAirport {
    id: number
    name: string
    ident: string
    local_code: string
    region: string
    type: string
    country: string
}

export interface ServerResponse<T> {
    count: number
    next: null | number
    previous: null | number
    results: T[]
}