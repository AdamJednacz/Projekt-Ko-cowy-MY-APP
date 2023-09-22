import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Example from "../Chart/Chart";

const Finance = () => {
    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <Link className="text" to="/FinanceMenu"><FontAwesomeIcon className="text" icon={faArrowLeft}/></Link>
                    <h1 className="header_item">Finance</h1>
                </header>
                <Example/>
            </div>
        </section>
    );
};

export default Finance;