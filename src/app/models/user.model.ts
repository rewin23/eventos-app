export interface User {
  id: string; // uuid
  username: string;
  password: string; // en local será plano, en real debería ser hash
  email?: string;
  createdAt: string;
}
