import { IUser, IUsersWithCredentials } from "@/types";

export const usersWithValidCredentials: IUsersWithCredentials[] = [
  {
    email: "seppo@seppo.com",
    password: "Password123",
  },
  {
    email: "test@test.com",
    password: "Password12345",
  },
  {
    email: "test2@test.com",
    password: "Password22",
  },
];

export const userDataWithInvalidPassword: IUsersWithCredentials[] = [
  {
    // no uppercase letter
    email: "seppo@seppo.com",
    password: "password123",
  },
  {
    // no number
    email: "test@test.com",
    password: "Password",
  },
  {
    // no lowercase letter
    email: "test2@test.com",
    password: "PASSWORD22",
  },
  {
    // less than 6 characters
    email: "correct@email.com",
    password: "P1a23",
  },
];
