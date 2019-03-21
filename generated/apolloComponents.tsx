export type Maybe<T> = T | null;

export interface UsersInput {
  where?: Maybe<UsersWhere>;

  limit?: Maybe<number>;

  offset?: Maybe<number>;

  sort?: Maybe<UserSort>;
}

export interface UsersWhere {
  OR?: Maybe<UsersWhere[]>;

  AND?: Maybe<UsersWhere[]>;

  id?: Maybe<StringWhere>;

  name?: Maybe<StringWhere>;

  email?: Maybe<StringWhere>;

  active?: Maybe<BooleanWhere>;

  createdAt?: Maybe<DateTimeWhere>;

  updatedAt?: Maybe<DateTimeWhere>;
}

export interface StringWhere {
  eq?: Maybe<string>;

  neq?: Maybe<string>;

  in?: Maybe<string[]>;

  notIn?: Maybe<string[]>;

  lt?: Maybe<string>;

  lte?: Maybe<string>;

  gt?: Maybe<string>;

  gte?: Maybe<string>;

  contains?: Maybe<string>;

  notContains?: Maybe<string>;

  startsWith?: Maybe<string>;

  notStartsWith?: Maybe<string>;

  endsWith?: Maybe<string>;

  notEndsWith?: Maybe<string>;
}

export interface BooleanWhere {
  eq: boolean;
}

export interface DateTimeWhere {
  eq?: Maybe<string>;

  neq?: Maybe<string>;

  in?: Maybe<string[]>;

  notIn?: Maybe<string[]>;

  lt?: Maybe<string>;

  lte?: Maybe<string>;

  gt?: Maybe<string>;

  gte?: Maybe<string>;
}

export interface UserSort {
  id?: Maybe<SortDirection>;

  firstName?: Maybe<SortDirection>;

  lastName?: Maybe<SortDirection>;

  address?: Maybe<SortDirection>;

  city?: Maybe<SortDirection>;

  state?: Maybe<SortDirection>;

  zip5?: Maybe<SortDirection>;

  phone?: Maybe<SortDirection>;

  email?: Maybe<SortDirection>;

  createdAt?: Maybe<SortDirection>;

  updatedAt?: Maybe<SortDirection>;
}

export interface TeamsInput {
  where?: Maybe<TeamsWhere>;

  limit?: Maybe<number>;

  offset?: Maybe<number>;

  sort?: Maybe<TeamsWhere>;
}

export interface TeamsWhere {
  OR?: Maybe<TeamsWhere[]>;

  AND?: Maybe<TeamsWhere[]>;

  id?: Maybe<StringWhere>;

  name?: Maybe<StringWhere>;

  active?: Maybe<BooleanWhere>;

  slug?: Maybe<StringWhere>;

  teamPermissions?: Maybe<TeamPermissionsWhere>;

  createdAt?: Maybe<DateTimeWhere>;

  updatedAt?: Maybe<DateTimeWhere>;
}

export interface TeamPermissionsWhere {
  OR?: Maybe<UsersWhere[]>;

  AND?: Maybe<UsersWhere[]>;

  userId?: Maybe<StringWhere>;

  teamId?: Maybe<StringWhere>;

  permission?: Maybe<StringWhere>;
}

export interface CreateUserInput {
  firstName: string;

  lastName: string;

  address: string;

  city: string;

  state: string;

  zip5: string;

  phone: string;

  email: string;

  active?: Maybe<boolean>;
}

export interface CreateTeamInput {
  name: string;

  description?: Maybe<string>;
}

export interface UpdateUserInput {
  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  address?: Maybe<string>;

  city?: Maybe<string>;

  state?: Maybe<string>;

  zip5?: Maybe<string>;

  phone?: Maybe<string>;

  email?: Maybe<string>;

  active?: Maybe<boolean>;
}

export interface UpdateTeamInput {
  name?: Maybe<string>;

  description?: Maybe<string>;
}

export interface RegisterInput {
  email: string;

  firstName: string;

  lastName: string;

  address: string;

  city: string;

  state: string;

  zip5: string;

  phone: string;
}

export interface DateRange {
  startDate: Date;

  endDate: Date;
}

export interface DateRangeWhere {
  containsDate?: Maybe<string>;

  containsDateRange?: Maybe<DateRange>;

  overlapsDateRange?: Maybe<DateRange>;
}

export interface StringRange {
  start: string;

  end: string;
}

export interface TeamsSort {
  id?: Maybe<SortDirection>;

  name?: Maybe<SortDirection>;

  createdAt?: Maybe<SortDirection>;

  updatedAt?: Maybe<SortDirection>;
}

export enum GlobalPermissionsEnum {
  Admin = "ADMIN",
  AdminTeams = "ADMIN_TEAMS",
  AdminTeamsCrud = "ADMIN_TEAMS_CRUD",
  AdminUsers = "ADMIN_USERS",
  AdminUsersCrud = "ADMIN_USERS_CRUD"
}

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC"
}

export enum MutationCodeEnum {
  Duplicate = "DUPLICATE",
  DoesNotExist = "DOES_NOT_EXIST",
  InputError = "INPUT_ERROR",
  UnknownError = "UNKNOWN_ERROR",
  Ok = "OK"
}

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = any;

/** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Date = any;

/** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Time = any;

// ====================================================
// Documents
// ====================================================

export type ConfirmLoginVariables = {
  token: string;
};

export type ConfirmLoginMutation = {
  __typename?: "Mutation";

  confirmLogin: ConfirmLoginConfirmLogin;
};

export type ConfirmLoginConfirmLogin = {
  __typename?: "ConfirmLoginResult";

  code: MutationCodeEnum;

  success: boolean;

  message: string;

  item: Maybe<ConfirmLoginItem>;
};

export type ConfirmLoginItem = {
  __typename?: "User";

  id: string;

  firstName: string;

  email: string;
};

export type RequestLoginVariables = {
  email: string;
  nextPage?: Maybe<string>;
};

export type RequestLoginMutation = {
  __typename?: "Mutation";

  requestLogin: RequestLoginRequestLogin;
};

export type RequestLoginRequestLogin = {
  __typename?: "RequestLoginResult";

  code: MutationCodeEnum;

  success: boolean;

  message: string;

  securityCode: Maybe<string>;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: LogoutLogout;
};

export type LogoutLogout = {
  __typename?: "LogoutResult";

  code: MutationCodeEnum;

  success: boolean;

  message: string;
};

export type RegisterVariables = {
  input: RegisterInput;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: "RegisterResult";

  code: MutationCodeEnum;

  success: boolean;

  message: string;

  securityCode: Maybe<string>;
};

export type UpdateMeVariables = {
  input: UpdateUserInput;
};

export type UpdateMeMutation = {
  __typename?: "Mutation";

  updateUser: UpdateMeUpdateUser;
};

export type UpdateMeUpdateUser = {
  __typename?: "UpdateUserResult";

  code: MutationCodeEnum;

  success: boolean;

  message: string;

  item: Maybe<UpdateMeItem>;
};

export type UpdateMeItem = {
  __typename?: "User";

  id: string;

  firstName: string;

  email: string;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: "User";

  id: string;

  email: string;

  firstName: string;

  lastName: string;

  address: string;

  city: string;

  state: string;

  zip5: string;

  phone: string;

  active: Maybe<boolean>;

  globalPermissions: Maybe<GlobalPermissionsEnum[]>;

  teamPermissions: Maybe<MeTeamPermissions[]>;
};

export type MeTeamPermissions = {
  __typename?: "OLUserPerms";

  team: Maybe<MeTeam>;

  permissions: string[];
};

export type MeTeam = {
  __typename?: "Team";

  id: string;

  name: string;

  description: Maybe<string>;

  active: Maybe<boolean>;

  slug: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const ConfirmLoginDocument = gql`
  mutation confirmLogin($token: String!) {
    confirmLogin(token: $token) {
      code
      success
      message
      item {
        id
        firstName
        email
      }
    }
  }
`;
export class ConfirmLoginComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ConfirmLoginMutation, ConfirmLoginVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ConfirmLoginMutation, ConfirmLoginVariables>
        mutation={ConfirmLoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ConfirmLoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ConfirmLoginMutation, ConfirmLoginVariables>
> &
  TChildProps;
export type ConfirmLoginMutationFn = ReactApollo.MutationFn<
  ConfirmLoginMutation,
  ConfirmLoginVariables
>;
export function ConfirmLoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ConfirmLoginMutation,
        ConfirmLoginVariables,
        ConfirmLoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ConfirmLoginMutation,
    ConfirmLoginVariables,
    ConfirmLoginProps<TChildProps>
  >(ConfirmLoginDocument, operationOptions);
}
export const RequestLoginDocument = gql`
  mutation requestLogin($email: String!, $nextPage: String) {
    requestLogin(email: $email, nextPage: $nextPage) {
      code
      success
      message
      securityCode
    }
  }
`;
export class RequestLoginComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<RequestLoginMutation, RequestLoginVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<RequestLoginMutation, RequestLoginVariables>
        mutation={RequestLoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RequestLoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RequestLoginMutation, RequestLoginVariables>
> &
  TChildProps;
export type RequestLoginMutationFn = ReactApollo.MutationFn<
  RequestLoginMutation,
  RequestLoginVariables
>;
export function RequestLoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RequestLoginMutation,
        RequestLoginVariables,
        RequestLoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RequestLoginMutation,
    RequestLoginVariables,
    RequestLoginProps<TChildProps>
  >(RequestLoginDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation logout {
    logout {
      code
      success
      message
    }
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      code
      success
      message
      securityCode
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const UpdateMeDocument = gql`
  mutation updateMe($input: UpdateUserInput!) {
    updateUser(input: $input) {
      code
      success
      message
      item {
        id
        firstName
        email
      }
    }
  }
`;
export class UpdateMeComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateMeMutation, UpdateMeVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateMeMutation, UpdateMeVariables>
        mutation={UpdateMeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateMeProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateMeMutation, UpdateMeVariables>
> &
  TChildProps;
export type UpdateMeMutationFn = ReactApollo.MutationFn<
  UpdateMeMutation,
  UpdateMeVariables
>;
export function UpdateMeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateMeMutation,
        UpdateMeVariables,
        UpdateMeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateMeMutation,
    UpdateMeVariables,
    UpdateMeProps<TChildProps>
  >(UpdateMeDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      address
      city
      state
      zip5
      phone
      active
      globalPermissions
      teamPermissions {
        team {
          id
          name
          description
          active
          slug
        }
        permissions
      }
    }
  }
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
