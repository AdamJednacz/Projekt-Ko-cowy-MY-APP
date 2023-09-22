import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faInstagram, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
library.add(faInstagram, faFacebook, faTwitter,);
const Start = () => {
    return (
        <section className="background">
            <div className="container">
                <div className="logo"></div>
                    <button className="btn"><Link className="text" to="/LoginOrRegister" >Start</Link></button>
                <div className="icon_container">
                    <FontAwesomeIcon icon="fa-brands fa-facebook"/>
                    <FontAwesomeIcon icon="fa-brands fa-instagram"/>
                    <FontAwesomeIcon icon="fa-brands fa-twitter"/>
                </div>
            </div>
        </section>
    );
};

export default Start;