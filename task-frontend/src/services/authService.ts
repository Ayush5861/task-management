import axios from 'axios';
import type { SignupData, LoginData } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (data: SignupData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};