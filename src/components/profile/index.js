import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase';


export default function Profile({user}) {

    const reducer = (state, newState) => ({...state, ...newState});
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    }; //initial state of profile


    const [{ profile, photosCollection, followerCount}, dispatch] = 
    useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            
            //const [user] = await getUserByUsername(user.username);
            const photos = await getUserPhotosByUsername(user.userId);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length}); //dispatch allows to set values
        }
            getProfileInfoAndPhotos();
        
    }, [user.username]);

    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string
    })
};