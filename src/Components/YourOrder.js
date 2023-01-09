import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'

export const YourOrder = ({email, user}) => {
  let cont = 0
  let orders = []
  const [shows, setShows] = useState([]);
  const history = useHistory();
  db.collection('Buyer-info').where("BuyerEmail", "==", email).get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        orders.push(doc.data())


      });
      setShows(orders)
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
    
    return (
      <>
      <Navbar user={user} />
        {shows.length !== 0 && <h1>Your Orders</h1>}
            <div className='products-container'>
                {shows.length === 0 && <div>slow internet...no orders to display</div>}
                {shows.map(order => (
                    <div className='product-card'>
                        <div className='product-name'>
                            {order.BuyerName}
                            {console.log(order)}
                        </div>
                        <div className='product-name'>
                            {order.BuyerPayment}
                        </div>
                        <div className='product-name'>
                            {order.BuyerCell}
                        </div>
                        <div className='product-name'>
                            {order.status}
                        </div>
                    </div>
                ))}
            </div>




      </>
    ) 
  
    
}

