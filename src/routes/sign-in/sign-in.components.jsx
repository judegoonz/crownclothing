
import { signInWithGooglePopup, createUserDocumentFromauth }  from '../../utility/firebase/firebase.utility';


const SignIn = () => {
    const logGoogleUser = async () => {
        const user = await signInWithGooglePopup();
        createUserDocumentFromauth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google PopUp</button>
        </div>
    );
};

export default SignIn;  