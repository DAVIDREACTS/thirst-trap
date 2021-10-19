import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import FirebaseContext from '../context/firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) =>  {
        event.preventDefault();

        //check if username exists
        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) { //create user in firebase if not created
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password); //function within firebase
            
                //authentication --- email address, password, and username
                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                //firebase user collection (create document)
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD); //after signup, led to dashboard (home)
            } catch (error) { //username already exists in conditional, don't include
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);

            }
        } else {
            setError('Username already taken, please try a different one');
        }

       
    };

    useEffect(() => {
        document.title = 'Sign Up - Thirst Trap';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-scren">
            <div className="flex w-3/5">
                <img src="/images/side-logo.jpg" alt="Thirst Trap" />
            </div>

            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items0center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Thirst Trap" className="mt-2 w-6/12 mb-4"/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input 
                                aria-label="Enter your full name"
                                type="text"
                                placeholder="Full Name"
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                                border-gray-primary rounded mb-2"
                                onChange={({target}) => setFullName(target.value)}
                                value={fullName}
                        />


                        <input 
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2"
                            onChange={({target}) => setUsername(target.value)}
                            value={username}
                        />

                        <input 
                            aria-label="Enter your email"
                            type="text"
                            placeholder="Email"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2"
                            onChange={({target}) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />

                        <input 
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2"
                            onChange={({target}) => setPassword(target.value)}
                            value={password}
                        />

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                                Sign Up
                        </button>
                        
                    </form>
                </div>

                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Log In</Link>
                    </p>
                </div>
            </div>
        </div>    
    );
}