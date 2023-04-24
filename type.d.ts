export type CreateUserInput = {
  fullName: string;
  image?: string;
  username: string;
};

export type UpdateUserInput = {
  id: string;
  fullName: string;
  image?: string;
};
