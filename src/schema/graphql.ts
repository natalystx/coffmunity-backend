/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    fullName: string;
    image?: Nullable<string>;
    username: string;
}

export class UpdateUserInput {
    id: string;
    fullName: string;
    image?: Nullable<string>;
}

export class User {
    id: string;
    fullName: string;
    image?: Nullable<string>;
    username: string;
}

export class ActionResponse {
    success: boolean;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(username: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;
}

type Nullable<T> = T | null;
