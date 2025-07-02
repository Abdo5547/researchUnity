import React, { useState } from 'react';

function ResetPasswordRequest() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/accounts/password_reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });
        if (response.ok) {
           
        } else {
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <button type="submit">Réinitialiser le mot de passe</button>
        </form>
    );
}

export default ResetPasswordRequest;
