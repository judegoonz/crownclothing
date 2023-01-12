

import SignUpForm from '../../components/sign-up-form/sign-up-form.components';
import SignInForm from '../../components/sign-in-form/sign-in-form.components';
import { AuthenticationContainer } from './authentication.styles';


const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;   