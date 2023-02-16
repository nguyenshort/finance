/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBankInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateBank
// ====================================================

export interface CreateBank_createBank {
  __typename: "Bank";
  id: string;
  account: string;
  name: string;
  bank: string;
}

export interface CreateBank {
  createBank: CreateBank_createBank;
}

export interface CreateBankVariables {
  input: CreateBankInput;
}
