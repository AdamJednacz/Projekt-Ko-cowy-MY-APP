import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const Income = ({ incomeHistory, setIncomeHistory }) => {
    const [formData, setFormData] = useState({
        amount: '',
        currency: '',
        category: '',
        date: '',
        description: ''
    });
    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        fetch('http://api.nbp.pl/api/exchangerates/tables/A')
            .then(response => response.json())
            .then(data => {
                const availableCurrencies = data[0].rates.map(rate => rate.code);
                setCurrencies(availableCurrencies);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych z API NBP', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.amount || !formData.currency || !formData.date) {
            const confirmation = window.confirm('You must fill in the date value and select the currency to continue');
            if (!confirmation) {
                return;
            }
        }
        const formDataText = JSON.stringify(formData);
        localStorage.setItem('incomeData', formDataText);
        console.log(localStorage)
        setIncomeHistory([...incomeHistory, formData]);
        setFormData({
            amount: '',
            currency: '',
            category: '',
            date: '',
            description: ''
        });
    };
    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <Link className="text" to="/FinanceMenu">
                        <FontAwesomeIcon className="text" icon={faArrowLeft} />
                    </Link>
                    <h1 className="header_item">Income</h1>
                </header>
                <form className="income_expenses_form" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        className="form_item"
                        name="amount"
                        placeholder="Enter the amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    <select
                        className="select form_item"
                        id="select"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}>
                        <option value="">Select currency</option>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="form_item"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        className="form_item"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="form_item description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input type="submit" className="btn" value="OK" />
                </form>
            </div>
        </section>
    );
};

export default Income;
