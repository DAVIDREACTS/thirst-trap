//LISTEN IF A USER LOGS IN OR LOGS OUT

import {useState, useEffect, useContext} from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            
            //have user, store user in localStorage
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else { //no user
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener(); //closing listener connnection
    }, [firebase]);

    return { user }
}
