import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../redux/transactions/operations";
import { getBalance } from "../../redux/balance/operations";
import { selectBalance } from "../../redux/balance/selectors";
import { selectTransactions } from "../../redux/transactions/slice";
import TransactionsList from "../Transactions/TransactionsList";
import ButtonAddTransactions from "../Transactions/ButtonAddTransaction";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);
  const transactions = useSelector(selectTransactions);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getBalance());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {user ? `Welcome, ${user.username}` : "Welcome"}
      </h2>

      <h3 className={styles.balance}>Balance: {balance} ₺</h3>

      <TransactionsList transactions={transactions} />

      <ButtonAddTransactions />
    </div>
  );
};

export default HomeTab;