import React from 'react';
import { Link} from 'react-router-dom';

const LoginOrRegister = () => {
    return (
        <section className="background">
            <div className="container LOR_container">
                <button className="btn"><Link className="text" to="/Login" >Sign in</Link></button>
                <button className="btn"><Link className="text" to="/Register" >Sign up</Link></button>
            </div>

        </section>
    );
};

export default LoginOrRegister;