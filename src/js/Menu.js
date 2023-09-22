import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { getAuth, signOut } from 'firebase/auth';
import { app, database } from '../firebase/FireBase';
import { doc, getDoc } from "firebase/firestore";
const Menu = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const docRef = doc(database, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [user]);

    const handleUserLogout = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then(() => {
                navigate('/Login');
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };
    return (
        <section className="background">
            <div className="container header_container">
                <header className="header">
                    <h1 className="header_item">Menu</h1>
                    {userData && (
                        <h2 className="header_item">Hello!<span> {userData.name} {userData.surname}</span></h2>
                    )}
                    <button onClick={handleUserLogout} className="btn header_logOut">Wyloguj</button>
                </header>
                <div className="btn_container">
                    <button className="btn"><Link className="text" to="/FinanceMenu">Finance</Link></button>
                    <button className="btn"><Link className="text" to="/Calculator">Calculator</Link></button>
                </div>
            </div>
        </section>
    );
};

export default Menu;
