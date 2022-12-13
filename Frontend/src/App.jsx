import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const fetching = async(endPoint,method)=>{
  let req = await fetch('http://localhost:3001/'+endPoint,{
    method:method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
  },
  // body: bodyData ? JSON.stringify(bodyData) : null,
  })
  let res = await req.json()
  return res;
}

const google = async()=>{
 window.open('http://localhost:3001/google',"_self")
}

const App = () => {
  const[authentication,setAuthentcation]=useState({
    isAuthenticated:false,
  })
  const logout= async()=>{
    let res = await fetching('logout','GET');
    console.log("logout",res)
    setAuthentcation(data=>({...data,...res}));
  }
  useEffect(()=>{
    (async()=>{
      let res = await fetching('','GET');
      setAuthentcation(data=>({...data,...res}));
    })()
  },[])
  // useEffect(()=>{
  //   console.log(authentication);
  // },[authentication])
  return (
    <>
    {authentication.isAuthenticated?
    <div>
      <table>
        <tbody>
          <tr>
            <th>Avtar</th>
            <td><img src={authentication.avtar}/></td>
          </tr>
          <tr>
            <th>User Google ID</th>
            <td>{authentication.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{authentication.Name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{authentication.email}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={logout}>Logout</button>
    </div>
    :<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <h2>Please Login through: </h2>
      <button onClick={google}>Google</button>
    </div>
    }
    </>
  )
}

export default App
