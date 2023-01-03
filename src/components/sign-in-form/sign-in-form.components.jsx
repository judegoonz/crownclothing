import { useState } from "react";

import Button from "../button/button.component";

import FormInput from "../form-input/form-input.components";
import {  
    signInWithGooglePopup, 
    createUserDocAuth, 
    signInAuthUserWithEmailAndPassword 
} from '../../utility/firebase/firebase.utility';
                                                           
import './sign-in-form.styles.scss';

const defaultFormfields = {
    email:'',
    password:'',
}



const SignInForm = () => {
    const [formFields, setFormfields] = useState(defaultFormfields);
    const { email, password } = formFields;


    const resetFormfields = () => {
        setFormfields(defaultFormfields);
    }

    
    const signInWithgoogle = async () => {
       await signInWithGooglePopup();
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormfields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('user doesnt exist');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormfields({...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an Account?</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit}>

            
                <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email} />

             
                <FormInput 
                label="Password"
                type="password" 
                required 
                onChange={handleChange} 
                name='password' 
                value={password} />

            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithgoogle}>
                    Google Sign In</Button>
            </div>
            </form>
        </div>
    );
}

export default SignInForm;