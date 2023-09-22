import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const AccountBalance = ({ incomeHistory, expensesHistory }) => {
    const [balances, setBalances] = useState({});
    useEffect(() => {
        const balanceMap = {};
        incomeHistory.forEach((incomeItem) => {
            const currency = incomeItem.currency;
            const amount = parseFloat(incomeItem.amount);
            balanceMap[currency] = (balanceMap[currency] || 0) + amount;
        });
        expensesHistory.forEach((expensesItem) => {
            const currency = expensesItem.currency;
            const amount = parseFloat(expensesItem.amount);
            balanceMap[currency] = (balanceMap[currency] || 0) - amount;
        });
        setBalances(balanceMap);
    }, [incomeHistory, expensesHistory]);

    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <Link className="text" to="/FinanceMenu">
                        <FontAwesomeIcon className="text" icon={faArrowLeft} />
                    </Link>
                    <h1 className="header_item">Account Balance</h1>
                </header>
                <h1>You have on your account:</h1>
                <div className="balance container">
                    {Object.entries(balances).map(([currency, balance]) => (
                        <div className="stat" key={currency}>
                            {currency} :<span className="value">{balance}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default AccountBalance;
