import { GoogleLogin, GoogleLogout } from 'react-google-login'

type LoginType = {
    signedIn: boolean,
    signIn: (token: string) => void,
    signOut: VoidFunction,
}

const Login = ({ signedIn, signIn, signOut }: LoginType) => {
    const succesfulLogin = async (response: any) => {
        const token = response.tokenId;
        signIn(token);
    }

    const failureLogin = async (response: any) => {
        signOut();
    }

    const signOutCookie = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 != null) {
            auth2.signOut().then(
                 auth2.disconnect().then(console.log('LOGOUT SUCCESSFUL'))
             )
        }
        signOut();
    }

    return (
        <>
            {signedIn ?
                <GoogleLogout
                    clientId="697462181933-htekt0b6cjojqcftfkh8mc9qjk29m07q.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="btn-login btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log out :(</button>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={signOutCookie}
                    onFailure={signOutCookie}
                />
                : <GoogleLogin
                    clientId="697462181933-htekt0b6cjojqcftfkh8mc9qjk29m07q.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="btn-login btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log in :)</button>
                    )}
                    buttonText='Login'
                    onSuccess={succesfulLogin}
                    onFailure={failureLogin}
                    cookiePolicy={'single_host_origin'}
                    
                    /* Seemed necessary for session. Not 100 % sure what this does though. (sets cookies etc.)*/
                    isSignedIn={true}
                />}
        </>
    )
}

export default Login
