import axios, { AxiosError } from 'axios'

const BASE_URL = 'http://localhost:8080/auth'

interface ApiResponse {
    success: boolean
    data: string | null
    error: string | null
}

export async function login(
    email: string,
    password: string
): Promise<ApiResponse> {
    try {
        const result = await axios.get(
            `${BASE_URL}?email=${email}&password=${password}`
        )
        return {
            success: result.data.ok,
            data: result.data.token,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error:
                err instanceof AxiosError
                    ? err.response!.data.reason
                    : 'Server error',
        }
    }
}

export async function signup(
    email: string,
    username: string,
    password: string
): Promise<ApiResponse> {
    try {
        const result = await axios.post(BASE_URL, {
            email,
            username,
            password,
            type: 'user',
        })

        return {
            success: result.data.ok,
            data: null,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error:
                err instanceof AxiosError
                    ? err.response!.data.error
                    : 'Server error',
        }
    }
}
