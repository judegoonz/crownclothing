import { Fragment,useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';

import { signOutUser } from '../../utility/firebase/firebase.utility';

import './navigation.styles.scss';



const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    return (
      <Fragment>
        <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrownLogo className='logo'/>
        </Link>
          <div className='nav-links-container'></div>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
           {currentUser ? (
            <span className='navi-link' onClick={signOutUser}>SIGN OUT</span>
           ) :  (
           <Link className='nav-link' to='/auth'>
           SIGN-IN
          </Link>
           )}
        </div>
        <Outlet />
      </Fragment>
    );
  };

  
  export default Navigation;