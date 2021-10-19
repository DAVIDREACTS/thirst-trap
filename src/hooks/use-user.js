import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            //function that we can call (firebase service) that gets user data based on id
            const [response] = await getUserByUserId(user.id); //destructuring response to access all
            setActiveUser(response);
        }
        if (user?.uid) {
            getUserObjByUserId();
        }
        
    }, [user]);

    return { user: activeUser };
}