import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../FireBase/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";

import "./ShowOrderSpecific.css";
const ShowOrderSpecific = () => {
  const { orderid } = useParams();

  const [orderdata, setorderdata] = useState([]);
  const getorderdata = async () => {
    const docRef = doc(db, "UserOrders", orderid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("data Exits in ShowOrderSpecific Page ", docSnap.data());
      setorderdata(docSnap.data());
    } else {
      console.log("Data Doesn't exists");
    }
  };
  useEffect(() => {
    getorderdata();
  }, []);
  return (
    <div className="order-section">
      <Navbar />
      <Link to={"/order"}>
        <button className="GobackBtn">Go Back </button>
      </Link>
      <h1 className="order-head">Order Details</h1>
      <div className="orderdetails-form">
        <div className="orderdetails_row">
          <p>Order ID </p>
          <p className="orderdetails_rowAns">{orderdata.orderid}</p>
        </div>
        <div className="orderdetails_row">
          <p>Custome Name</p>
          <p className="orderdetails_rowAns">{orderdata.ordername}</p>
        </div>
        <div className="orderdetails_row">
          <p>Order Address</p>
          <p className="orderdetails_rowAns">{orderdata.orderAddress}</p>
        </div>
        <div className="orderdetails_row">
          <p>Custome Phone Number</p>
          <p className="orderdetails_rowAns">{orderdata.orderphone}</p>
        </div>
        <div className="orderdetails_row">
          <p>Order status</p>
          <p className="orderdetails_rowAns">{orderdata.orderStatus}</p>
        </div>
        <div className="orderdetails_row">
          <p>Order Cost</p>
          <p className="orderdetails_rowAns">{orderdata.orderCost}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderSpecific;
