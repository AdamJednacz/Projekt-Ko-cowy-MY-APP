import './App.scss';
import Start from "./js/Start";
import {
    Route,
    Routes,
    BrowserRouter
} from 'react-router-dom';


import React, { useState } from 'react';

import LoginOrRegister from './js/LoginOrRegister';
import Login from './js/Login';
import Register from './js/Register';
import Menu from './js/Menu';
import FinanceMenu from './js/FinanceMenu';
import Calculator from './js/Calculator';
import Income from './js/Income';
import Expenses from './js/Expenses';
import Finance from './js/Finance';
import AccountBalance from './js/AccountBalance';
import History from './js/History';
import { UserProvider } from './providers/UserProvider';
import {FinanceProvider} from "./providers/FinanceContext";

function App() {
    const [incomeHistory, setIncomeHistory] = useState([]);
    const [expensesHistory, setExpensesHistory] = useState([]);

    return (
        <UserProvider>
            <FinanceProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/LoginOrRegister" element={<LoginOrRegister />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Menu" element={<Menu />} />
                    <Route path="/FinanceMenu" element={<FinanceMenu />} />
                    <Route path="/Income" element={<Income incomeHistory={incomeHistory} setIncomeHistory={setIncomeHistory} />} />
                    <Route path="/Expenses" element={<Expenses expensesHistory={expensesHistory} setExpensesHistory={setExpensesHistory} />} />
                    <Route path="/Finance" element={<Finance />} />
                    <Route path="/AccountBalance" element={<AccountBalance incomeHistory={incomeHistory} expensesHistory={expensesHistory} />} />
                    <Route path="/History" element={<History incomeHistory={incomeHistory} expensesHistory={expensesHistory} />} />
                    <Route path="/Calculator" element={<Calculator />} />
                </Routes>
            </BrowserRouter>
            </FinanceProvider>
        </UserProvider>
    );
}

export default App;
