import React from 'react';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useFinanceContext } from '../providers/FinanceContext';

const Example = () => {
    const { totalIncome, totalExpenses } = useFinanceContext();

    const data = [
        {
            name: 'Chart of income and expenses in PLN',
            Income: totalIncome,
            Expenses: totalExpenses,
            amt: 2400,
        },
    ];

    return (
        <ResponsiveContainer width="80%" height="80%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#8884d8" />
                <Bar dataKey="Expenses" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Example;
