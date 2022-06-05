import { Selector } from "react-redux";
import { RootState } from "../../types/types";
import { createSelector } from "@reduxjs/toolkit";
import { transactionsSelectors } from "./transactions.slice";
import { Transaction } from "./transaction.model";

export const selectInProgressTransactions: Selector<RootState, Transaction[]> = createSelector(
    [transactionsSelectors.selectAll],
    (transactions: Transaction[]) => transactions.filter((transaction: Transaction) => transaction.isActive)
);
