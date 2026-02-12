export interface Expense {
    id: number;
    transactionName: string;
    category: string;
    amount: number;
    isExpense: boolean;
    createdAt: string; // ISO date string
}