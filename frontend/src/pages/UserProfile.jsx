import React,{useState,useEffect} from 'react';
import Header from '../components/Header';

const wrapperStyle = {
  height: '100vh', // 100% of the viewport height
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'pink', // Set to blue
};

const containerStyle = {
  width: '80%',
  height: '50%',
  backgroundColor: '#f2f2f2', // Gray-ish white
  borderRadius: '10px', // Rounded edges
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for shades
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  bottom: '60px'
};

const textStyles = {
  margin: '10px',
  fontSize: '25px',
  fontWeight: 'bold',
  color: 'black', 
};

const UserProfile = () => {
    const [id, setId] = useState('...')
    const [number, setNumber] = useState('...')
    const [userName, setUsername] = useState('...')
    const [email, setEmail] = useState('...')

    useEffect(() => {
        async function getData() {
            const userData = await fetch('http://localhost:4000/user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jwtToken: document.cookie.split('=')[1] })        
            })
            
            const data = await userData.json()
            setId(data[0].UserID)
            setEmail(data[0].Email)
            setUsername(data[0].Name)
            setNumber(data[0].Number)
            
            console.log(data)
        }

        getData()
    }, [])

    return (
        <>
        <Header></Header>
        <div style={wrapperStyle}>
            <div style={containerStyle}>
                <p style={textStyles}>ID: {id}</p>
                <p style={textStyles}>Number: {number}</p>
                <p style={textStyles}>Username: {userName}</p>
                <p style={textStyles}>Email: {email}</p>
            </div>
        </div>
        </>
    );
};

export default UserProfile;