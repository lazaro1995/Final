import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select"
import { storage, db} from '../Config/Config'
import { doc, setDoc } from "firebase/firestore"; 

export const Order = () => {
  const { orders } = useContext(ProductsContext);
  const [temp, setTemp] = useState('');
  const [value,setValue] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [valueSelect, setvalueSelect] = useState('');
  const prueba =(id) =>{
    handleShow()
    setTemp(id)
  }
  const test = [
    { label: 'pending', value: 'pending' },
    { label: "delivery", value: 'delivery' },
    { label: "complete", value: 'complete' },
  ];
  const SetValue = ({value}) => {
    console.log(value)
    setvalueSelect(value)
    
   
  };
  const updateStatus = async () => {
    console.log(valueSelect)
    console.log(temp) 
    var statusOrder = db.collection("Buyer-info").doc(temp);
    statusOrder.update({
      status: valueSelect
  })
  .then(() => {
      console.log("Document successfully updated!");
      handleClose()
      window.location.reload()
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
   
    
   
  };
  const DeleteOrder = (id) => {
    db.collection("Buyer-info").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.reload()
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });

  }

  return (
    <>
      {orders.length !== 0 && <h1>Order</h1>}
      <div className="container">
        {orders.length === 0 && (
          <div>slow internet...no products to display</div>
        )}
        <ul class="list-group">
          {orders.map((order) => (
            <li class="list-group-item">
              <div className="row">
                <div className="col-6">
                  <div className="product-name">{order.OrderEmail}</div>
                  <div className="product-price">{order.OrderName}</div>
                  <div className="product-name">{order.OrderAddress}</div>
                  <div className="product-name">{order.OrderStatus}</div>
                 
                </div>
                <div className="col-6">
                  <div class="card card-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Product Name</th>
                          <th scope="col">Qty</th>
                        </tr>
                      </thead>
                      {order.OrderProducts.map((product) => (
                        <tbody>
                          <tr>
                            <th scope="row">{product.product}</th>
                            <th>{product.qty}</th>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <br></br>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
                <button
                  class="btn btn-primary me-md-2"
                  type="button"
                  onClick={ () => prueba(order.OrderID)}
                >
                  Edit Status
                </button>
                <button class="btn btn-danger" type="button" onClick={() => DeleteOrder(order.OrderID)}>
                  Delete Order
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal show={show} onHide={handleClose} className="bg-transparent" >
                  <Modal.Header closeButton>
                    <Modal.Title>Update Status</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Select 
                    defaultValue= 'Select'
                    options= {test}
                    onChange = {SetValue}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button className="btn btn-success" onClick= {() => updateStatus()}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
    </>
  );
};



