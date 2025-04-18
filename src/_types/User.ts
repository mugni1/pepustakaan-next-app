export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  roles: { id: number; name: string };
  created_at: string;
  updated_at: string;
}
