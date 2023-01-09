import React, { useEffect } from 'react'
import { Navbar } from './Navbar';
import { Products } from './Products'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Footer } from './Footer';
import { Order } from './ListOrder';
import { Link } from 'react-router-dom'

export const Home = ({ user, rol }) => {


    const history = useHistory();
    
    if(rol==='admin'){
        return(
            <div>

            <Navbar user={user} />
            <Order/>
            </div>
        )
    }
    else{
        return (
            <div className='wrapper'>
                <Navbar user={user} />
                <div className='row'>
                    <div className='col-10'>

                    </div>
                    <div className='col-2'>
                    <span><Link to="yourorder" className='navlink'>Your Orders</Link></span>
                    </div>
                </div>
               
                <Products />
                <Footer/>
            </div>
        )
    }

}
