import React from 'react';
import './Home.css'; // Import the updated CSS

function Home() {
  return (
    <div className="home-container">
      <div className="banner">
        <h1>Welcome to Inventory Management System</h1>
        <p>Efficiently manage your stock with ease.</p>
      </div>

      <div className="features-section">
        <div className="feature-card animated-card">
          <h3>How to Manage Your Inventory</h3>
          
          <ol className='list-group text-start'>
            <li className='list-group-item'>1. Log in to your account.</li>
            <li className='list-group-item'>2. Navigate to the "My Inventory" section.</li>
            <li className='list-group-item'>3. Click "Add Product" to add a new item.</li>
            <li className='list-group-item'>4. Use the "Edit" button to update stock details.</li>
            <li className='list-group-item'>5. Click "Delete" to remove unwanted products.</li>
          </ol>
        </div>

        <div className="feature-card animated-card">
          <h3>Why Use Our Inventory System?</h3>
          
          <ul className='list-group text-start'>
            <li className='list-group-item'>✔ Easy product management.</li>
            <li className='list-group-item'>✔ Track stock levels in real time.</li>
            <li className='list-group-item'>✔ User-friendly interface.</li>
            <li className='list-group-item'>✔ Quick add, update, and delete options.</li>
            <li className='list-group-item'>✔ Secure and efficient system.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
