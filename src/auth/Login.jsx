import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';


import {Link, useNavigate} from 'react-router-dom';
import './auth.scss'
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export const Login=()=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const [role, setRole] = useState('');

    const handleChange = (e) => {
      setRole(e.target.value);
    };
    const {setLoggedUser,setId}=useContext(UserContext);

    const handleSubmmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}= await axios.post('http://localhost:8080/log/login',{username,role,password},{
                withCredentials:true
            })
            setId(data.id);
            setLoggedUser(username);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="auth">
            <div className="container">
                <form>
                <Link to={'/'} className='link'><KeyboardBackspaceOutlinedIcon className='back'/></Link>
                <Card className='card' sx={{ maxWidth: 345 }}>
                    <h2>Login</h2>
                    <TextField id="outlined-basic" label="Username" variant="outlined" size="small"  value={username} onChange={e=>setUsername(e.target.value)}/>

                    <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label" size='small'>Role</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            size='small'
                            label="Role"
                            onChange={handleChange}
                            >
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"User"}>User</MenuItem>
                            </Select>
                    </FormControl>

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
                        New User! Click <Link to={'/register'}>here</Link> to Register
                    </span>
                    <Button variant="contained" className='btn' onClick={handleSubmmit}>Login</Button>
                </Card>

                    
                    
                </form>
            </div>
        </div>
    );
}