import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import './addcenter.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export const Addcenter = () => {
  const [addloc, setAddloc] = useState({
    location: '',
    dose: null,
    heldon: '',
    s1: null,
    s2: null,
    s3: null,
    slot1: '',
    slot2: '',
    slot3: '',
  });

  const [tabledata,setTabledata]=useState([]);

  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const res=await axios.get('http://localhost:8080/add/loc',{
        withCredentials:true
      })
      setTabledata(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchdata();
  },[tabledata]);

  const handleAdd = (e) => {
    setAddloc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { location, dose, heldon, s1, s2, s3, slot1, slot2, slot3 } = addloc;

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:8080/add',addloc,{
        withCredentials:true
      })
      setAddtoggle(false);
    }
    catch(err)
    {
      console.log(err);
    }
  }


  const [addtoggle,setAddtoggle]=useState(false);

  return (
    <div className="addcenter">
      {
        addtoggle 
            &&
            <div className="add">
            <Card className="cd">
              <div  className="link" onClick={() => setAddtoggle(prev => !prev)}>
                <CloseIcon className="close" />
              </div>
              <div className="card">
                <TextField
                  id="location"
                  label="Location"
                  size="medium"
                  value={location}
                  name="location"
                  placeholder='Eg. Chennai'
                  onChange={handleAdd}
                  variant="outlined"
                />
                <TextField
                  id="dose"
                  label="Dose Count"
                  value={dose}
                  name="dose"
                  placeholder='Eg. 100'
                  onChange={handleAdd}
                  type="number"
                  size="medium"
                  variant="outlined"
                />
                <TextField
                  id="heldon"
                  label="Date"
                  size="medium"
                  placeholder='07-05-2024'
                  value={heldon}
                  name="heldon"
                  onChange={handleAdd}
                  variant="outlined"
                />
                <div className="lab">
                  <TextField
                    id="slot1"
                    size="medium"
                    value={slot1}
                    name="slot1"
                    placeholder='Eg. 10AM-12PM'
                    onChange={handleAdd}
                    label="Slot 1 Time"
                    variant="outlined"
                  />
    
                  <TextField
                    id="s1"
                    label="Slot 1 Count"
                    value={s1}
                    name="s1"
                    placeholder='Eg. 10'
                    onChange={handleAdd}
                    type='number'
                    size="medium"
                    variant="outlined"
                  />
                </div>
                <div className="lab">
                <TextField
                    id="slot1"
                    size="medium"
                    value={slot2}
                    name="slot2"
                    placeholder='Eg. 1PM-2PM'
                    onChange={handleAdd}
                    label="Slot 2 Time"
                    variant="outlined"
                  />
    
                  <TextField
                    id="s1"
                    label="Slot 2 Count"
                    value={s2}
                    name="s2"
                    placeholder='Eg. 10'
                    onChange={handleAdd}
                    type='number'
                    size="medium"
                    variant="outlined"
                  />
                </div>
                <div className="lab">
                <TextField
                    id="slot1"
                    size="medium"
                    value={slot3}
                    name="slot3"
                    placeholder='Eg. 3PM-4PM'
                    onChange={handleAdd}
                    label="Slot 3 Time"
                    variant="outlined"
                  />
    
                  <TextField
                    id="s1"
                    label="Slot 3 Count"
                    value={s3}
                    name="s3"
                    placeholder='Eg. 10'
                    onChange={handleAdd}
                    type='number'
                    size="medium"
                    variant="outlined"
                  />
                </div>
              </div>
              <Button variant="contained" onClick={handleSubmit} className="btn">
                ADD
              </Button>
            </Card>
          </div> 

      }
      <div className="container">
        <div className="display">
            <div className="button">
              <div>

              </div>
              <Button variant="contained" onClick={() => setAddtoggle(prev => !prev)} className="btn">
                  ADD NEW CENTER
                </Button>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Dose Count</th>
                    <th>HeldOn</th>
                    <th>Slot 1 Timing</th>
                    <th>Slot 2 Timing</th>
                    <th>Slot 3 Timing</th>
                    <th>Total Slot1</th>
                    <th>Booked slots</th>
                    <th>Total Slot2</th>
                    <th>Booked slots</th>
                    <th>Total Slot3</th>
                    <th>Booked slots</th>
                    {/* <th>Remove</th> */}
                  </tr>
                </thead>
                <tbody>
                  {tabledata.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.location}</td>
                      <td>{item.dose}</td>
                      <td>{moment(item.heldon).format('DD-MM-YYYY')}</td>
                      <td>{item.slot1}</td>
                      <td>{item.slot2}</td>
                      <td>{item.slot3}</td>
                      <td>{item.s1}</td>
                      <td>{item.rem1}</td>
                      <td>{item.s2}</td>
                      <td>{item.rem2}</td>
                      <td>{item.s3}</td>
                      <td>{item.rem3}</td>
                      {/* <td></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
};

