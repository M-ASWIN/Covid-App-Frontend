import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

import {Link, useNavigate} from 'react-router-dom';
import './auth.scss';
import axios from 'axios';
import { useContext,useState } from 'react';
import { UserContext } from '../context/UserContext';

export const Register=()=>{

    const {setLoggedUser,setId}=useContext(UserContext);

    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // const [role,setRole]=useState('User');
    const role='User';

    const navigate=useNavigate();


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post('http://localhost:8080/log/register',{username,email,role,password},{
            withCredentials:true
        });
        setId(data.id);
        setLoggedUser(username);
        navigate('/');
    }
    catch(err)
    {
        console.log(err);
    }
    
}
    return (
        <div className="auth">
            <div className="container">
                <form>
                <Link to={'/'} className='link'><KeyboardBackspaceOutlinedIcon className='back'/></Link>
                <Card className='card' >
                    <h2>Register</h2>
                    <TextField id="outlined-basic" label="Username" variant="outlined" size="small"  value={username} onChange={e=>setUsername(e.target.value)}/>
                    <TextField id="outlined-basic" label="Email"   type="email" variant="outlined" size="small" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Role"
                    size="small"
                    defaultValue="User"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        size="small"
                        autoComplete="current-password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        />

                    <span className="link">
                        Existing User! Click <Link to={'/login'}>here</Link> to Login
                    </span>
                    <Button variant="contained" className='btn' onClick={handleSubmit}>Register</Button>
                </Card>

                    
                    
                </form>
            </div>
        </div>
    );
}