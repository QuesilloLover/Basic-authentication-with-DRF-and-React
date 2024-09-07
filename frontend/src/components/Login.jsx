import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            setSuccessmessage("Inicio de sesión exitoso!");  // Set success message
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh);
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
            <h2>Iniciar Sesion</h2>
            <form>
                <label>Email:</label><br/>
                <input type="email" name='email' value={formData.email} onChange={handleChange}/> <br/>

                <label>Password:</label><br/>
                <input type="password" name='password' value={formData.password} onChange={handleChange}/> <br/>

                <br/>
                <button type='submit' disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? 'Registering...' : 'Login'}
                </button>
            </form>
        </div>
    );
}