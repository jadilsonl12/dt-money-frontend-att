import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";

export interface ITableProps {
    data: ITransaction[];
    onEdit: (transaction: ITransaction) => void;
    onDelete: (transactionId: string) => void;
}

export function Table({ data, onEdit, onDelete }: ITableProps) {
    return (
        <table className="w-full mt-16 border border-separate border-spacing-y-2 ">
            <thead>
                <tr>
                    <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id ?? 'no-id'} className="bg-white h-16 rounded-lg">
                        <td className="px-4 py-4 whitespace-nowrap text-title">{item.title}</td>
                        <td className={`px-4 py-4 whitespace-nowrap text-right ${item.type === 'income' ? "text-income-value" : "text-outcome"}`}>
                            {formatCurrency(item.price)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">{item.category}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{formatDate(new Date(item.data))}</td>
                        <td className="px-4 py-4 whitespace-nowrap flex space-x-2">
                            <button
                                type="button"
                                className="text-white mt-3 w-full justify-center rounded-md bg-orange-400 py-3 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                                onClick={() => onEdit(item)}
                            >
                                Alterar
                            </button>
                            <button
                                type="button"
                                className="text-white mt-3 w-full justify-center rounded-md bg-red-500 py-3 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                                onClick={() => item.id && onDelete(item.id)}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
