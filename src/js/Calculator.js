import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Calculator = () => {
    const [amount, setAmount] = useState("");
    const [sourceCurrency, setSourceCurrency] = useState('PLN');
    const [targetCurrency, setTargetCurrency] = useState('PLN');
    const [exchangeRates, setExchangeRates] = useState({});
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
              const response = await fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`);
                if (!response.ok) {
                     new Error('Błąd pobierania kursów walutowych');
                }
                const data = await response.json();
                const rates = data[0].rates.reduce((acc, rate) => {
                    acc[rate.code] = rate.mid;
                    return acc;
                }, {});
                rates['PLN'] = 1;
                setExchangeRates(rates);
                setError(null);
            } catch (error) {
                setError('Błąd pobierania kursów walutowych');
                console.error('Błąd pobierania kursów walutowych: ', error);
            }
        };
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        if (exchangeRates[sourceCurrency] && exchangeRates[targetCurrency]) {
            const rateSourceToPLN = sourceCurrency === 'PLN' ? 1 : exchangeRates[sourceCurrency];
            const rateTargetToPLN = targetCurrency === 'PLN' ? 1 : exchangeRates[targetCurrency];
            if (sourceCurrency === 'PLN' && targetCurrency === 'PLN') {
                setConvertedAmount(amount === '' ? '' : parseFloat(amount).toFixed(2));
            } else {
                const converted = (amount === '' ? '' : parseFloat(amount) / rateSourceToPLN) * rateTargetToPLN;
                setConvertedAmount(converted === '' ? '' : converted.toFixed(2));
            }
        }
    }, [amount, sourceCurrency, targetCurrency, exchangeRates]);

    const handleAmountChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setAmount(isNaN(newValue) ? '' : newValue);
    };
    const handleSourceCurrencyChange = (e) => {
        setSourceCurrency(e.target.value);
    };
    const handleTargetCurrencyChange = (e) => {
        setTargetCurrency(e.target.value);
    };
    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <Link className="text" to="/Menu">
                        <FontAwesomeIcon className="text" icon={faArrowLeft} />
                    </Link>
                    <h1 className="header_item">Calculator</h1>
                </header>
                <form className="form">
                    <input
                        type="number"
                        className="form_item"
                        name="amount"
                        placeholder="Enter the amount"
                        value={amount}
                        onChange={handleAmountChange}/>
                    <select
                        className="select"
                        name="currency"
                        id="currency2"
                        value={targetCurrency}
                        onChange={handleTargetCurrencyChange}>
                        {Object.keys(exchangeRates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select"
                        name="currency"
                        id="currency1"
                        value={sourceCurrency}
                        onChange={handleSourceCurrencyChange}>
                        {Object.keys(exchangeRates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <FontAwesomeIcon className="arrow" icon={faArrowDown} />
                    <div className="form_item div">
                        Your Result: {convertedAmount !== null ? `${convertedAmount} ${sourceCurrency !== null ? sourceCurrency : ''}` : ''}
                    </div>

                </form>
            </div>
        </section>
    );
};

export default Calculator;
