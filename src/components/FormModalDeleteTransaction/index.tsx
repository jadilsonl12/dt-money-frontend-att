import { ITransaction } from "@/types/transaction";

export interface IFormModalDeleteTransactionProps {
    formTitle: string;
    closeModal: () => void;
    deleteTransaction: (transactionId: string) => void;
    transactionId: string | undefined; // Adiciona a propriedade transactionId como opcional
}

export function FormModalDeleteTransaction({ formTitle, closeModal, deleteTransaction, transactionId }: IFormModalDeleteTransactionProps) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <button
                            type="button"
                            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
                            onClick={closeModal}
                            aria-label="Fechar"
                        >
                            <span className="text-2xl">&times;</span>
                        </button>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">{formTitle}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 px-12 mt-4 mb-6">
                            <p>Tem certeza de que deseja excluir esta transação?</p>
                        </div>
                        <div className="bg-gray-50 px-12 py-2 flex sm:flex-row-reverse w-full mb-11 gap-6">
                            <button
                                type="button"
                                className="mt-3 w-full justify-center rounded-md bg-red-500 text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                                onClick={() => transactionId && deleteTransaction(transactionId)}
                            >
                                Confirmar
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full justify-center rounded-md bg-gray-500 text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
