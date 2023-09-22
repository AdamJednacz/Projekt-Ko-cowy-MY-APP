import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const FinanceMenu = () => {
    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <Link className="text" to="/Menu"><FontAwesomeIcon className="text" icon={faArrowLeft}/></Link>
                    <h1 className="header_item">Finance Menu</h1>
                </header>
                <div className="btn_container">
                    <button className="btn"><Link className="text" to="/Income">Income</Link></button>
                    <button className="btn"><Link className="text" to="/Expenses">Expenses</Link></button>
                    <button className="btn"><Link className="text" to="/Finance">Finance</Link></button>
                    <button className="btn"><Link className="text" to="/AccountBalance">Account Balance</Link></button>
                    <button className="btn"><Link className="text" to="/History">History</Link></button>
                </div>
            </div>
        </section>
    );
};

export default FinanceMenu;