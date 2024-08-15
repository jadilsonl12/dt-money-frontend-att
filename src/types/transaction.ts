export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: "income" | "outcome";
}