import { useState } from "react";

import Button from "../button/button.component";

import FormInput from "../form-input/form-input.components";
import {  createAuthUserwithEmailandpassword, createUserDocAuth } from '../../utility/firebase/firebase.utility'

import './sign-up-form.styles.scss';


const defaultFormfields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:'',
};



const SignUpForm = () => {
    const [formFields, setFormfields] = useState(defaultFormfields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormfields = () => {
        setFormfields(defaultFormfields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserwithEmailandpassword(
                email, 
                password
                );
           
            await createUserDocAuth(user, { displayName });
            resetFormfields();
        
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('invalid email, email already in use');
            } else {
                console.log('error', error);
            }
            

        }

    }

    console.log(formFields);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormfields({...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an Account?</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleSubmit}>
              
                <FormInput 
                label="Display Name"
                type="text" 
                required=""
                onChange={handleChange} 
                name='displayName' 
                value={displayName} />

                <FormInput 
                label="Email"
                type="email" 
                required=""
                onChange={handleChange} 
                name='email' 
                value={email} />

                <FormInput 
                label="Password"
                type="password" 
                required=""
                onChange={handleChange} 
                name='password' 
                value={password} />

                <FormInput 
                label="Confirm Password"
                type="password" 
                required=""
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword} />
                <Button  type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;