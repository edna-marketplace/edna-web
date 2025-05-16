import { api } from "@/lib/axios"

export interface SignInBody {
    email: string
    password: string
}

export async function signIn({ email, password }: SignInBody) {
    const credentials = btoa(`${email}:${password}`);

    console.log(credentials)
    
    await api.post('/auth', {}, {
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    });
}