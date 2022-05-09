export interface Auth {
    id: string;
    access_token: string;
    refresh_token: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    imageUrl: string;
}

export interface AuthState {
    user: Auth | null;
    isLoggedIn: boolean;
}