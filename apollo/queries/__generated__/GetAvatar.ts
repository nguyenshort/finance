/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAvatar
// ====================================================

export interface GetAvatar_identity {
  __typename: "Identity";
  id: string;
  avatar: string;
}

export interface GetAvatar {
  identity: GetAvatar_identity | null;
}
