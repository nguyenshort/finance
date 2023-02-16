/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSupporter
// ====================================================

export interface GetSupporter_me_collaborator {
  __typename: "Collaborator";
  id: string;
  fanpage: string;
}

export interface GetSupporter_me {
  __typename: "User";
  id: string;
  collaborator: GetSupporter_me_collaborator | null;
}

export interface GetSupporter {
  me: GetSupporter_me;
}
