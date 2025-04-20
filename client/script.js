document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email })
        });
        
        const data = await response.json();
        document.getElementById('message').textContent = data.message || 'User created successfully!';
        document.getElementById('userForm').reset();
    } catch (error) {
        document.getElementById('message').textContent = 'Error submitting form';
        console.error('Error:', error);
    }
});