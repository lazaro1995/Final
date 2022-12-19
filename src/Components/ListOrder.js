import React, { useContext } from "react";
import { ProductsContext } from "../Global/ProductsContext";

export const Order = () => {
  const { orders } = useContext(ProductsContext);
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
                <button class="btn btn-primary me-md-2" type="button">
                  Edit Status
                </button>
                <button class="btn btn-danger" type="button">
                  Cancel Order
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
