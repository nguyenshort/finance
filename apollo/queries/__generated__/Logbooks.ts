/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetLogbooksFilter, LOGBOOK_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: Logbooks
// ====================================================

export interface Logbooks_logbooks {
  __typename: "Logbook";
  id: string;
  createdAt: number;
  note: string | null;
  /**
   * Nhóm trạng thái
   */
  status: LOGBOOK_STATUS;
  amount: number;
}

export interface Logbooks {
  logbooks: Logbooks_logbooks[];
}

export interface LogbooksVariables {
  filter: GetLogbooksFilter;
}
