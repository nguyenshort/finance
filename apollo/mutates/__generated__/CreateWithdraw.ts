/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateWithdrawInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateWithdraw
// ====================================================

export interface CreateWithdraw_createWithdraw {
  __typename: "Withdraw";
  id: string;
  amount: number;
}

export interface CreateWithdraw {
  createWithdraw: CreateWithdraw_createWithdraw;
}

export interface CreateWithdrawVariables {
  input: CreateWithdrawInput;
}
