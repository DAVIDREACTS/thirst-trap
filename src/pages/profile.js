import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/profile/header';
import UserProfile from '../components/profile';


export default function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    //const [userExists, setUserExists] = useState(false);
    const history = useHistory();

    //checking if user exists
    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);

            if (user?.userId) {
                setUser(user);
                //setUserExists(true);
            } else {
                //setUserExists(false);
                history.push(ROUTES.NOT_FOuND);
            }
        }

        checkUserExists();
    }, [username, history]); //both used

    return user?.length > 0 ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user}/>
            </div>
        </div>
    ): null;
}