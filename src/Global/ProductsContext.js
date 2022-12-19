import React, { createContext } from 'react'
import { db } from '../Config/Config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
   
    state = {
        products: [],
        orders: []
    }

    componentDidMount() {

        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })
        const prevOrder = this.state.orders;
        db.collection('Buyer-info').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                    prevOrder.push({
                        OrderID: change.doc.id,
                        OrderName: change.doc.data().BuyerName,
                        OrderAddress: change.doc.data().BuyerAddress,
                        OrderCell: change.doc.data().BuyerCell,
                        OrderProducts: change.doc.data().Products,
                        OrderEmail: change.doc.data().BuyerEmail,
                        OrderStatus: change.doc.data().status

                    })
                    
                
                this.setState({
                    orders: prevOrder
                })
            })

        })
    }
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products], orders: [...this.state.orders]  }}>
                {this.props.children}
            </ProductsContext.Provider>
            
        )
    }
}



