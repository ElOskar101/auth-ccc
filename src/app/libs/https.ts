export interface HttpResponse<T> {
    status: number
    ok: boolean
    headers: Headers
    data: T
}

export interface HttpClient {
    <T>(url: string, options?: RequestInit): Promise<HttpResponse<T>>
}

export function createHttpClient(
    baseUrl: string = "https://carriers.dentalautomation.ai/"
): HttpClient {

    return async function http<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<HttpResponse<T>> {

        const response = await fetch(baseUrl + url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        })

        const contentType = response.headers.get('content-type') ?? ''

        let data: any
        if (contentType.includes('application/json')) {
            data = await response.json()
        } else {
            data = await response.text()
        }

        if (!response.ok) {
            throw {
                status: response.status,
                message: data?.message || data || '',
                data
            }
        }

        return {
            status: response.status,
            ok: response.ok,
            headers: response.headers,
            data: data as T
        }
    }
}
