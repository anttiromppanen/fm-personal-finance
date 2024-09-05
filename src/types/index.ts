export interface IUser {
  id: string;
  email: string;
}

export interface IUsersWithCredentials {
  email: string;
  password: string;
}

export interface IEmailAndPassword {
  email: string;
  password: string;
}

export interface ITransaction {
  id: string;
  amount: number;
  message: string;
  toUserId: string;
  fromName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBalance {
  id: string;
  userId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBill {
  id: string;
  name: string;
  userId: string;
  amount: number;
  paid: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBudget {
  id: string;
  name: string;
  userId: string;
  amount: number;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPot {
  id: string;
  name: string;
  userId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
