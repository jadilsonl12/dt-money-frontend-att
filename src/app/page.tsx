"use client"
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { BodyContainer } from "@/components/BodyContainer";
import { ITransaction } from "@/types/transaction";
import { Table } from "@/components/Table";
import { useEffect, useState } from "react";
import { FormModal } from "@/components/FormModal";
import { FormModalAlterTransaction } from "@/components/FormModalAlterTransaction";
import { FormModalDeleteTransaction } from "@/components/FormModalDeleteTransaction";
import { useTransaction } from "@/hooks/useTransaction";

export interface ITotal {
  totalIncome: number;
  totalOutcome: number;
  total: number;
}

export default function Home() {
    const [isModalOpenNewTransaction, setIsModalOpenNewTransaction] = useState(false);
    const [isModalOpenAlterTransaction, setIsModalOpenAlterTransaction] = useState(false);
    const [isModalOpenDeleteTransaction, setIsModalOpenDeleteTransaction] = useState(false);
    const [totalTransactions, setTotalTransactions] = useState<ITotal>({ totalIncome: 0, totalOutcome: 0, total: 0 });

    const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
    const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

    const { data: transactions, isLoading } = useTransaction.ListAll();
    const { mutateAsync: create } = useTransaction.Create();
    const { mutateAsync: update } = useTransaction.Update();
    const { mutateAsync: remove } = useTransaction.Delete();

    const openModalNewTransaction = () => setIsModalOpenNewTransaction(true);
    const closeModalNewTransaction = () => setIsModalOpenNewTransaction(false);

    const openModalAlterTransaction = (transaction: ITransaction) => {
        setTransactionToEdit(transaction);
        setIsModalOpenAlterTransaction(true);
    };
    const closeModalAlterTransaction = () => {
        setIsModalOpenAlterTransaction(false);
        setTransactionToEdit(null);
    };

    const openModalDeleteTransaction = (transactionId: string) => {
        setTransactionToDelete(transactionId);
        setIsModalOpenDeleteTransaction(true);
    };
    const closeModalDeleteTransaction = () => {
        setIsModalOpenDeleteTransaction(false);
        setTransactionToDelete(null);
    };

    const handleAddTransaction = async (transaction: ITransaction) => {
        await create(transaction);
        closeModalNewTransaction();
    };

    const handleUpdateTransaction = async (transaction: ITransaction) => {
        await update(transaction);
        closeModalAlterTransaction();
    };

    const handleDeleteTransaction = async (transactionId: string) => {
        await remove(transactionId);
        closeModalDeleteTransaction();
    };

    useEffect(() => {
        const totals = transactions?.reduce((acc, transaction) => {
            if (transaction.type === 'income') {
                acc.totalIncome += transaction.price;
                acc.total += transaction.price;
            } else if (transaction.type === 'outcome') {
                acc.totalOutcome += transaction.price;
                acc.total -= transaction.price;
            }
            return acc;
        }, { totalIncome: 0, totalOutcome: 0, total: 0 });
        setTotalTransactions(totals || { totalIncome: 0, totalOutcome: 0, total: 0 });
    }, [transactions]);

    if (isLoading) return <h1>Carregando...</h1>;

    return (
        <div className="bg-background h-full min-h-screen">
            <Header openModalNewTransaction={openModalNewTransaction} />
            <BodyContainer>
                <CardContainer totals={totalTransactions} />
                <Table
                    data={transactions ?? []}
                    onEdit={openModalAlterTransaction}
                    onDelete={openModalDeleteTransaction}
                />
            </BodyContainer>
            {isModalOpenNewTransaction && (
                <FormModal
                    formTitle="Cadastro de Transação"
                    closeModal={closeModalNewTransaction}
                    AddTransaction={handleAddTransaction}
                />
            )}
            {isModalOpenAlterTransaction && transactionToEdit && (
                <FormModalAlterTransaction
                    formTitle="Alterar Transação"
                    closeModal={closeModalAlterTransaction}
                    updateTransaction={handleUpdateTransaction}
                    transactionToEdit={transactionToEdit}
                />
            )}
            {isModalOpenDeleteTransaction && transactionToDelete && (
                <FormModalDeleteTransaction
                    formTitle="Excluir Transação"
                    closeModal={closeModalDeleteTransaction}
                    deleteTransaction={handleDeleteTransaction} 
                    transactionId={transactionToDelete}
                />
            )}
        </div>
    );
}
