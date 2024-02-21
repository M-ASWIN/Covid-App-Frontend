import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


import './bookslot.scss';
import Select from 'react-select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate}from 'react-router-dom';

export const Bookslot=()=>{

    const [optionval,setOptionval]=useState([]);
    const [selectloc,setSelectloc]=useState('');
    const [selectdate,setSelectdate]=useState('');
    const [selectslot,setSelectslot]=useState('');
    const [slotname,setSlotname]=useState('');
    const [avacount,setAvacount]=useState(0);
    const [slotcount,setSlotcount]=useState(0);
    const navigate=useNavigate();
    const [data,setData]=useState([{
        location: '',
        dose: null,
        heldon: '',
        s1: 0,
        s2: 0,
        s3: 0,
        slot1: '00AM',
        slot2: '00PM',
        slot3: '00PM',
        rem1:0,
        rem2:0,
        rem3:0,
    }]);
    const [book,setBook]=useState({
        name:'',
        age:0,
        sltcount:0,
        gender:'',
        address:''
    })

    const handleInput=(e)=>{
        setBook((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const value = parseInt(avacount) + parseInt(book.sltcount);
            if(value <=slotcount)
            {
                await axios.post('http://localhost:8080/book',{book,selectloc,selectdate,selectslot,value,slotname},{
                    withCredentials:true
                })
                alert("Slot Booked Successfully");
                navigate('/');
            }
            else
            {
                alert("The selected Location timing does not have enough slot");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const fetchdata=async()=>{
            const res=await axios.get('http://localhost:8080/add/loc');
            const formattedData = res.data.map(item => ({ value: item.location, label: item.location }));
            
            setOptionval(formattedData);
        }
        
        fetchdata();
    },[selectloc]);

    const fetchView=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:8080/add/view',{selectloc,selectdate},{
                withCredentials:true
            });
            setData(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="bookslot">
            <div className="container">
                <div className="left">
                    <div className="userdata">
                        <TextField id="filled-basic" name='name' value={book.name} onChange={handleInput} label="Name" size='medium' variant="outlined" />
                        <TextField id="filled-basic" name='age' value={book.age} onChange={handleInput}   label="Age" type='number' size='medium' variant="outlined" />
                        <TextField id="filled-basic" name='sltcount' value={book.sltcount} onChange={handleInput}  label="Number of Slots " type='number' size='medium' variant="outlined" />
                        <div className="gender">
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                value={book.gender}
                                onChange={handleInput}
                                >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>

                        </div>
                        <textarea name="address" value={book.address} onChange={handleInput}   className='address' cols="0" 
                        placeholder='Address'
                        rows="3"></textarea>
                    </div>
                </div>
                <div className="right">
                    <div className="slots">
                        <div className='top'>
                            <div className="con">
                                <label htmlFor="Center">Select Center Location</label>
                                <Select
                                    className='select'
                                    value={optionval.find(option => option.value === selectloc)} // Set the selected value
                                    onChange={selectedOption => setSelectloc(selectedOption.value)}
                                    options={optionval}
                                    isSearchable
                                    placeholder="Select or type to Centers..."
                                />
                            </div>
                            <div className="con">
                                <label htmlFor="date">Choose Date</label>
                                <TextField id="filled-basic" onChange={e=>setSelectdate(e.target.value)} size='small' type='date'variant="outlined" />
                            </div>
                        </div>
                        <div className="bottom">
                            <Button variant="contained" 
                             className="btn" onClick={fetchView} 
                            >View</Button>

                        </div>
                    </div>
                    <div className="remaining">
                        {
                            data.length ===0 ?  <div className="nodata">
                                <h1>No Centers Available on that Day</h1>
                            </div>:

                            <>
                                <RadioGroup className='group'
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"

                                value={selectslot}
                                onChange={e=>setSelectslot(e.target.value)}
                            >  
                            <div className="grp">
                                <div className="slt">
                                    <span>
                                        Vacant Slot
                                    </span>
                                    <span className="name">
                                        {data[0]?.s1-data[0]?.rem1}
                                    </span>
                                </div>
                                <FormControlLabel name='slot1' onChange={() => {setAvacount(data[0].rem1);setSlotcount(data[0].s1);setSlotname('rem1')}}  value={`${data[0]?.slot1}`} control={<Radio />} label={`${data[0]?.slot1}`} />
                            </div>
                            <div className="grp">
                                <div className="slt">
                                    <span>
                                        Vacant Slot 
                                    </span>
                                    <span className="name">
                                    {data[0]?.s2-data[0]?.rem2}
                                    </span>
                                </div>
                                <FormControlLabel name='slot2' onChange={() => {setAvacount(data[0].rem2);setSlotcount(data[0].s2);setSlotname('rem2')}} value={`${data[0]?.slot2}`}  control={<Radio />} label={`${data[0]?.slot2}`}  />
                            </div>
                            <div className="grp">
                                <div className="slt">
                                    <span>
                                        Vacant Slot 
                                    </span>
                                    <span className="name">
                                    {data[0]?.s3-data[0]?.rem3}
                                    </span>
                                </div>
                                <FormControlLabel name='slot3' onChange={() => {setAvacount(data[0].rem3);setSlotcount(data[0].s3);setSlotname('rem3')}} value={`${data[0]?.slot3}`}  control={<Radio />} label={`${data[0]?.slot3}`}  />
                            </div>
                        </RadioGroup>
                            </>
                        }
                    </div>
                </div>
            </div>
                <div>
                <Button variant="contained" 
                  className="btn" onClick={handleSubmit}
                    >Book New Slot</Button>
                </div>
        </div>
    );
}