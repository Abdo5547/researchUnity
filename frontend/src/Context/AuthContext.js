import { createContext, useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem('authTokens');
        return storedToken ? jwtDecode(storedToken) : null;
    });
    const [authTokens, setAuthTokens] = useState(() => {
        const storedToken = localStorage.getItem('authTokens');
        return storedToken ? JSON.parse(storedToken) : null;
    });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: e.target.email.value, password: e.target.password.value })
        });

        const data = await response.json();

        if(data.access){
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/home/home')
        } else {
            alert('Something went wrong while logging in the user!')
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    const updateToken = async () => {
        if (!authTokens) return;
        
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({refresh: authTokens.refresh})
        });
       
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
