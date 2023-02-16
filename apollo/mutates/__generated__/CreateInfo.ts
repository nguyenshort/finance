/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInfoInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateInfo
// ====================================================

export interface CreateInfo_createInfo {
  __typename: "Info";
  id: string;
  name: string;
}

export interface CreateInfo {
  createInfo: CreateInfo_createInfo;
}

export interface CreateInfoVariables {
  input: CreateInfoInput;
}
