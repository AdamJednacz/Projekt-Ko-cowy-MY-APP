import { createContext, useContext, useState } from 'react';

const FinanceContext = createContext();

export const useFinanceContext = () => {
    return useContext(FinanceContext);
};
export const FinanceProvider = ({ children }) => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const updateIncomeSum = (newSum) => {
        setTotalIncome(newSum);
    };
    const updateExpensesSum = (newSum) => {
        setTotalExpenses(newSum);
    };
    return (
        <FinanceContext.Provider value={{ totalIncome, totalExpenses, updateIncomeSum, updateExpensesSum }}>
            {children}
        </FinanceContext.Provider>
    );
};
