import { useState } from "react";
import { Box, Stack, TextField, Button, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  
  const defaultFormDataValue =  {
    username: "",
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(defaultFormDataValue);
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json(); 

      if(res.ok){
        setError("");
        setFormData(defaultFormDataValue)
        navigate('/signin')
      }else{
        setError(data.error || "An error occurred while signing up");
      }
    } catch (error) {
      setError("An error occurred while signing up");
    }
  }
  return (
    <Box width="1000px" height="100vh" mx="auto" pt='5%'>
      <Stack gap='10px'>
        <Box fontSize='50px' fontWeight='500' mx='auto'>Sign Up</Box>
        <TextField
          id="username"
          label="Username"
          value={formData.username}
          onChange={handleFormChange}
        />
        <TextField
          id="email"
          label="Email"
          value={formData.email}
          onChange={handleFormChange}
        />
        <TextField
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleFormChange}
          type="password"
        />
        <Button variant="outlined" sx={{ width: "10%", mx: "auto", mt: '20px' }} onClick={handleSubmit}>
          Submit
        </Button>
        <Box mx='auto' color='lightgray'>
          Already Have an Account? 
          <Link onClick={()=>navigate('/signin')} fontWeight='500' sx={{ cursor:'pointer'}}>  Sign In</Link>
        </Box>
      </Stack>

      {error!="" && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
