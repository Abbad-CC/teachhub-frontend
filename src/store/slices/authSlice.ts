import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, AuthResponse, SignupCredentials, LoginCredentials, AdminLoginCredentials } from '../../types/auth.types';
import { jwtDecode } from 'jwt-decode';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

// Helper function to decode JWT token
const decodeToken = (token: string): User | null => {
    try {
        const decoded = jwtDecode<any>(token);

        console.log("this is the decoded token and type of userID", decoded, typeof decoded.userId)
        return {
            id: decoded.userId,
            name: decoded.userName || '',
            email: decoded.email || '',
            role: decoded.role,
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ...initialState,
        user: initialState.token ? decodeToken(initialState.token) : null,
    },
    reducers: {
        loginRequest: (state, _action: PayloadAction<LoginCredentials>) => {
            state.isLoading = true;
            state.error = null;
        }
        ,
        loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            localStorage.setItem('token', action.payload.token);
            console.log("the login was successful, This is the states user" , state.user)
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = action.payload;
            localStorage.removeItem('token');
        },
        signupRequest: (state, _action: PayloadAction<SignupCredentials>) => {
            state.isLoading = true;
            state.error = null;
        }
        ,
        signupSuccess: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            localStorage.setItem('token', action.payload.token);
        },
        signupFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = action.payload;
            localStorage.removeItem('token');
        },
        adminLoginRequest: (state, _action: PayloadAction<AdminLoginCredentials>) => {
            state.isLoading = true;
            state.error = null;
        }
        ,
        adminLoginSuccess: (state, action: PayloadAction<{ token: string; admin: { id: string; name: string; email: string } }>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = {
                id: action.payload.admin.id,
                name: action.payload.admin.name,
                email: action.payload.admin.email,
                role: 'admin',
            };
            state.error = null;
            localStorage.setItem('token', action.payload.token);
        },
        adminLoginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = action.payload;
            localStorage.removeItem('token');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
    adminLoginRequest,
    adminLoginSuccess,
    adminLoginFailure,
    logout,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;