import React from 'react';
import './About.css';

function About() {
  return (
    <div className="root">
      <div className='text-center m-10 w-50 card mx-auto'>
        <div className="card-body">
          <h5>
            Welcome to <strong>Inventory Management System</strong> – your efficient solution for organizing and tracking your stock with ease.
            Our platform allows businesses and individuals to manage their inventory seamlessly, ensuring accurate stock levels and smooth operations.
          </h5>
          <p>
            With our system, you can:
          </p>
          <ul className="list-group text-start">
            <li className="list-group-item">✔ Add new products to your inventory.</li>
            <li className="list-group-item">✔ Update stock levels and pricing.</li>
            <li className="list-group-item">✔ Delete obsolete products easily.</li>
            <li className="list-group-item">✔ Keep track of stock status (In Stock / Out of Stock).</li>
          </ul>
          <p>
            Our mission is to simplify inventory management, reduce errors, and enhance productivity. Start managing your inventory smarter today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
