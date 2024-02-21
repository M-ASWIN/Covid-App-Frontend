import { createContext, useEffect, useState } from "react";
import axios from 'axios'

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [loggeduser, setLoggedUser] = useState(null);
  const [id, setId] = useState(null);
  // const [toggle,setToggle]=useState(false);

  useEffect(()=>{
    axios.get('http://localhost:8080/log/profile',{
      withCredentials:true,
    }).then(res=>{
      setLoggedUser(res.data.username);
      setId(res.data.id);
    })
  },[]);
  // console.log(loggeduser);

  return (
    <div>
      <UserContext.Provider value={{ loggeduser, setLoggedUser, id, setId }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export { UserContext, UserContextProvider };
