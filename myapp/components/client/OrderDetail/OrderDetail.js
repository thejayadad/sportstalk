'use client'
// OrderDetail.js
import React from 'react';

const OrderDetail = ({ order }) => {
  return (
    <div>
      <h2>Order Details</h2>
      <p>Customer: {order.customer}</p>
      <p>Address: {order.address}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <p>Status: {order.status === 0 ? 'Pending' : 'Completed'}</p>
      <p>Payment Method: {order.method === 0 ? 'Credit Card' : 'Other'}</p>
    </div>
  );
};

export default OrderDetail;
