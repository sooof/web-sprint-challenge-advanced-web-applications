import React , {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Logout = (props) => {        
    const {push} = useHistory()
    // console.log("Logout ", props)
    // console.log("Logout ", push)
    useEffect(()=> {
        // const token = localStorage.getItem("token");
        axios.post(`http://localhost:5000/api/logout`, {}, {
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(resp => {
            console.log("Logout axios.post resp ", resp)
            localStorage.removeItem("token")
            push('/login');
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    // console.log("Logout")
    return(<div><h1>Logout</h1></div>);
}

export default Logout;

// Task List
// 1. On mount, execute a http request to the logout endpoint.
// 2. On a successful request, remove the token from localStorage and redirect to the login page.