import api from './axios';
import type { task } from '../types/task';

export const getTask = async (status?: string) => {
  const url = status ? `/task?status=${status}` : '/task';

  const response = await api.get(url);

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/task/${id}`);

  return response.data;
};

export const addTask = async (data: task) => {
  const response = await api.post('/task', data);

  return response.data;
};

export const updateTask = async (id: number, data: task) => {
  const response = await api.put(`/task/${id}`, data);

  return response.data;
};