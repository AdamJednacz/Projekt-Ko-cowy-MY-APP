import React, {  useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/FireBase';
const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const handleLogin = () => {
        const auth = getAuth(app);
        const { email, password } = values;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/Menu');
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert('wrong email or password');
            });
    };

    return (
        <section className="background">
            <div className="container Login_container">
                <form className="form">
                    <input
                        type="email"
                        value={values.email}
                        className="form_item"
                        name="email"
                        placeholder="E-mail"
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    <input
                        type="password"
                        value={values.password}
                        className="form_item"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />
                    <input
                        onClick={handleLogin}
                        type="button"
                        className="btn"
                        value="Log in"
                    />
                </form>
            </div>
        </section>
    );
};

export default Login;
