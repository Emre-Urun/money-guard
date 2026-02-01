import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editTransaction } from "../../redux/transactions/operations";
import styles from "./EditTransactionForm.module.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number().positive().required("Amount is required"),
  category: Yup.string().required("Category is required"),
});

const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: transaction,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(editTransaction({ id: transaction.id, updates: data }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.label}>Title</label>
      <input {...register("title")} className={styles.input} />
      {errors.title && <p>{errors.title.message}</p>}

      <label className={styles.label}>Amount</label>
      <input type="number" {...register("amount")} className={styles.input} />
      {errors.amount && <p>{errors.amount.message}</p>}

      <label className={styles.label}>Category</label>
      <input {...register("category")} className={styles.input} />
      {errors.category && <p>{errors.category.message}</p>}

      <button type="submit" className={styles.buttonEdit}>Save</button>
    </form>
  );
};

export default EditTransactionForm;