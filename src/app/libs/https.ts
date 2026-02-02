export interface HttpClient {
    <T>(url: string, options?: RequestInit): Promise<T>
}

export function createHttpClient(baseUrl: string | "https://carriers.dentalautomation.ai/"): HttpClient {
    return async function http<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(baseUrl + url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        })

        if (!response.ok) {
            let data = null;
            if (response.headers.get('content-type') === 'application/json') {
                data = await response.json()
            }else{
                data = await response.text()
            }

            throw {
                status: response.status,
                ... { message: data?.message || data || 'Error desconocido' },
            }
        }

        return response.json()
    }
}
