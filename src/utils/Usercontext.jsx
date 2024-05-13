import { createContext,useState,useEffect, Children, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { account } from '../appwriteconfig';
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    
    useEffect(()=>{
        setLoading(false)
        currentUser()
    },[])

    const handleUserResgistration = async (e,cred)=>{
        e.preventDefault()
        try {
            if(cred.password1!==cred.password2){
               
                alert('password mismatch');
                return
            }
            const resp = await account.create(
                ID.unique(),
                cred.email,
                cred.password1,
                cred.name
            )
            setUser(resp)
            console.log(resp);
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    const currentUser = async()=>{
        try {
            const userDetails = await account.get()
            if(userDetails)
            setUser(userDetails)
            else setUser(null)
            console.log(userDetails);
            
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleUserLogin = async (e,cred) => {
        e.preventDefault();
        try {
            const resp = await  account.createEmailPasswordSession(cred.email,cred.password)
            const userDetails = await  account.get()
            setUser(userDetails)
            console.log(userDetails);
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        setUser(null)
    }


    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserResgistration
    }



    return <AuthContext.Provider value={contextData}>
        {
            loading ? <p>loadin....</p> : children
        }
    </AuthContext.Provider>
}
export const userAuth = ()=>{
    return useContext(AuthContext)
}
export default AuthContext