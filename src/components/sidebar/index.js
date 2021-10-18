import React, { useContext } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
    //const x = useUser();
    //console.log('x',x);

    const { username: { docId = '', fullName, username, userId, following } = {} } = useContext(LoggedInUserContext);
    //console.log('fullName, username, userId', fullName, username, userId);

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    );
}

//export default memo(Sidebar);

//Sidebar.whyDidYouRender = true;
