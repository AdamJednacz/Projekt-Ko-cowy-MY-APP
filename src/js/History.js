import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useFinanceContext } from '../providers/FinanceContext';
const EXCHANGE_RATE = 4;
const History = ({ incomeHistory, expensesHistory }) => {
    const { totalIncome, totalExpenses, updateIncomeSum, updateExpensesSum } = useFinanceContext();
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const incomeSum = incomeHistory.reduce((total, item) => total + (item.amount * EXCHANGE_RATE), 0);
        const expensesSum = expensesHistory.reduce((total, item) => total + (item.amount * EXCHANGE_RATE), 0);
        updateIncomeSum(incomeSum);
        updateExpensesSum(expensesSum);
    },  [incomeHistory, expensesHistory, updateIncomeSum, updateExpensesSum]);

    const mergedHistory = [
        ...incomeHistory.map(item => ({ ...item, type: 'income' })),
        ...expensesHistory.map(item => ({ ...item, type: 'expenses' })),
    ];
    mergedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    const filteredHistory = selectedCategory === 'all' ? mergedHistory : mergedHistory.filter(item => item.type === selectedCategory);
    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <Link className="text" to="/FinanceMenu">
                        <FontAwesomeIcon className="text" icon={faArrowLeft} />
                    </Link>
                    <h1 className="header_item">History</h1>
                </header>
                <div className="btn_container_history">
                    <button className={`btn ${selectedCategory === 'income' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('income')}>
                        Income
                    </button>
                    <button className={`btn ${selectedCategory === 'expenses' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('expenses')}>
                        Expenses
                    </button>
                    <button className={`btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}>
                        All
                    </button>
                </div>
                <div className="list">
                    {filteredHistory.map((item, index) => (
                        <div className={`list_item ${item.type === 'income' ? 'income' : 'expenses'}`}
                            key={index}>
                            <div className="list_item_container">
                                <FontAwesomeIcon icon={item.type === 'income' ? faPlus : faMinus} />
                                <div className="data_container">
                                    <p className="value list_item_item">Amount: {item.amount} {item.currency}</p>
                                    <p className="category list_item_item">Category: {item.category}</p>
                                    <p className="date list_item_item">Date: {item.date}</p>
                                    <p className="description list_item_item">Description: {item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default History;

