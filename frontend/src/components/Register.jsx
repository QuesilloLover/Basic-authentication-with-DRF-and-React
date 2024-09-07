import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });

    const [error, setError] = useState(null);  // Add state for error messages
    const [successMessage, setSuccessmessage] = useState(null);  // Add state for success message
    const [isLoading, setIsLoading] = useState(false);  // State to track loading

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(isLoading) return;

        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            setSuccessmessage("Registration successful!");  // Set success message
            setError(null);  // Clear any previous errors
        } catch (error) {
            setSuccessmessage(null);  // Clear success message in case of error
            if(error.response && error.response.data){
                Object.keys(error.response.data).forEach((field) => {
                    const errorMessages = error.response.data[field];
                    if(errorMessages && errorMessages.length > 0){
                        setError(errorMessages[0]);  
                    }
                });
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false); 
        }
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}  
            <h2>Register</h2>
            <form>
                <label>Username:</label><br/>
                <input type="text" name='username' value={formData.username} onChange={handleChange}/><br/>

                <label>Email:</label><br/>
                <input type="email" name='email' value={formData.email} onChange={handleChange}/> <br/>

                <label>Password:</label><br/>
                <input type="password" name='password1' value={formData.password1} onChange={handleChange}/> <br/>

                <label>Confirm Password:</label><br/>
                <input type="password" name='password2' value={formData.password2} onChange={handleChange}/> <br/>
            
                <br/>
                <button type='submit' disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
