import Login from './Login'
import '../styles/header.css'
import prism from '../pictures/prism1.png'

type HeaderType = {
    signedIn: boolean,
    signIn: (token: string) => void,
    signOut: VoidFunction,
}
const Header = ({ signedIn, signIn, signOut }: HeaderType) => {
    return (
        <header>
            <div className="header-left">
                {/* This bitch empty*/}
                <h1>vidds™</h1>
                
            </div>
            <div className="header-mid">
                <img src={prism}/>
            </div>
            <div className="header-right">
                <Login
                    signedIn={signedIn}
                    signIn={signIn}
                    signOut={signOut}
                />
            </div>
        </header>
    )
}

export default Header
