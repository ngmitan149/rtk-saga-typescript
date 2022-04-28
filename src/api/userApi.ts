import { User } from 'models/user';
import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';

const userApi = {
  login(body: any): Promise<any> {
    const url = '/auth/login';
    return axiosClient.post(url, body);
  },
  getAll(params: ListParams): Promise<ListResponse<User>> {
    const url = '/users';
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<User> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  add(data: User): Promise<User> {
    const url = '/users';
    return axiosClient.post(url, data);
  },

  update(data: Partial<User>): Promise<User> {
    const url = `/users/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string | number): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;