export interface User {
  id: number | string;
  username: string;
  password?: string;
  email: string;
  role?: number;
}

// export interface UserForm extends User {
//   password: string
// }
