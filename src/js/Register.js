import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {app, database} from '../firebase/FireBase';
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repetemail: '',
        repetpassword: '',
    });
    const handleChange = ({ target: { name, value } }) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleAdd = () => {
        const auth = getAuth(app);
        const { name, surname, email, password, repetemail, repetpassword } = values;
        let errorMessages = [];
        if (repetemail !== email) {
            errorMessages.push('Emails do not match');
        }
        if (repetpassword !== password) {
            errorMessages.push('Passwords do not match');
        }
        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
            console.log('błąd');
        } else {
            console.log('ok');
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log(user)

                    await setDoc(doc(database, "users", user.uid), {
                        name,
                        surname
                    });
                    navigate('/Login');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Firebase Error - Code:', errorCode, 'Message:', errorMessage);
                    if (errorCode === 'auth/email-already-in-use') {
                        alert('This email is already registered. Please use a different email.');
                    }
                });
        }
    };
    return (
        <section className="background">
            <div className="container Register_container">
                <form className="form">
                    <input
                        type="text"
                        className="form_item"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                    />
                    <input
                        type="text"
                        className="form_item"
                        name="surname"
                        value={values.surname}
                        onChange={handleChange}
                        placeholder="Your Surname"
                    />
                    <input
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        className="form_item"
                        name="email"
                        placeholder="E-mail"
                    />
                    <input
                        type="email"
                        value={values.repetemail}
                        onChange={handleChange}
                        className="form_item"
                        name="repetemail"
                        placeholder="Repet E-mail"
                    />
                    <input
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        className="form_item"
                        name="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        value={values.repetpassword}
                        onChange={handleChange}
                        className="form_item"
                        name="repetpassword"
                        placeholder="Repet Password"
                    />
                    <input type="button" onClick={handleAdd} value="Save" className="btn" />
                </form>
            </div>
        </section>
    );
};

export default Register;
