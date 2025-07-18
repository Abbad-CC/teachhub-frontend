import { call, put, takeEvery } from 'redux-saga/effects';
import {type PayloadAction} from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
} from '../slices/authSlice';
import type {
    LoginCredentials,
    SignupCredentials,
    AuthResponse,
    AdminLoginCredentials,
    AdminAuthResponse,
} from '../../types/auth.types';

const API_BASE_URL = 'http://localhost:5000/api';

// API calls
const loginAPI = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> =>
  axios.post(`${API_BASE_URL}/auth/login`, credentials);

const signupAPI = (credentials: SignupCredentials): Promise<AxiosResponse<AuthResponse>> =>
  axios.post(`${API_BASE_URL}/auth/signup`, credentials);

const adminLoginAPI = (credentials: AdminLoginCredentials): Promise<AxiosResponse<AdminAuthResponse>> =>
  axios.post(`${API_BASE_URL}/auth/admin/login`, credentials);

// Saga functions
function* loginSaga(action: PayloadAction<LoginCredentials>) {
  try {
    const response: AxiosResponse<AuthResponse> = yield call(loginAPI, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Login failed';
    yield put(loginFailure(errorMessage));
  }
}

function* signupSaga(action: PayloadAction<SignupCredentials>) {
  try {
    const response: AxiosResponse<AuthResponse> = yield call(signupAPI, action.payload);
    yield put(signupSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Signup failed';
    yield put(signupFailure(errorMessage));
  }
}

function* adminLoginSaga(action: PayloadAction<AdminLoginCredentials>) {
  try {
    const response: AxiosResponse<AdminAuthResponse> = yield call(adminLoginAPI, action.payload);
    yield put(adminLoginSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Admin login failed';
    yield put(adminLoginFailure(errorMessage));
  }
}

// Watcher sagas
export function* watchLoginSaga() {
  yield takeEvery(loginRequest, loginSaga);
}

export function* watchSignupSaga() {
  yield takeEvery(signupRequest, signupSaga);
}

export function* watchAdminLoginSaga() {
  yield takeEvery(adminLoginRequest, adminLoginSaga);
}