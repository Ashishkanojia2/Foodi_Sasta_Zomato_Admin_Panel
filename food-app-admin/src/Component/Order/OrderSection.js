import React, { useEffect, useState } from "react";
import "./OrderSection.css";
import Navbar from "../NavBar/Navbar";
import { db } from "../../FireBase/FireBaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
const OrderSection = () => {
  const [alldata, setalldata] = useState([]);
  const [allorderstatus, setallorderstatus] = useState("");
  const [keyword, setkeyword] = useState("");

  const getallorder = async () => {
    setalldata([]);
    const querySnapShot = await getDocs(collection(db, "UserOrders"));
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setalldata((pre) => [...pre, doc.data()]);
    });
  };

  useEffect(() => {
    getallorder();
  }, []);
  console.log(alldata);

  const changeOrderStatus = (id, orderdata, status) => {
    console.log("Changing order status:", id, orderdata, status);

    const docRef = doc(db, "UserOrders", id);
    const data = {
      ...orderdata,
      orderStatus: status,
    };

    setDoc(docRef, data)
      .then(() => {
        console.log("Order status successfully updated");
        // Fetch updated data after status change
        getallorder();
      })
      .catch((err) => {
        console.error("Error updating order status:", err);
        alert("Error updating order status. Please try again later.");
      });
  };

  const DeliveryBoyName = (id, orderdata, boyname) => {
    const docRef = doc(db, "UserOrders", id);
    const data = {
      ...orderdata,
      deliveryboy_name: boyname,
    };

    setDoc(docRef, data)
      .then(() => {
        alert("Document Successfully written");
        getallorder();
      })
      .catch((err) => {
        console.error("Error updating order status:", err);
        alert("Error updating order status. Please try again later.");
      });
  };
  const DeliveryBoyPhone = (id, orderdata, boyPhone) => {
    const docRef = doc(db, "UserOrders", id);
    const data = {
      ...orderdata,
      deliveryboy_Phone: boyPhone,
    };

    setDoc(docRef, data)
      .then(() => {
        alert("Document Successfully written");
        getallorder();
      })
      .catch((err) => {
        console.error("Error updating order status:", err);
        alert("Error updating order status. Please try again later.");
      });
  };

  return (
    // <div>
    //   <Navbar />
    // </div>
    <div className="order-section">
      <Navbar />
      <h1 className="order-head1"> Order Section</h1>
      <div className="order-s1">
        <input
          type="text"
          placeholder="Search by orderid and Devivery status"
          className="searchbar"
          onChange={(e) => setkeyword(e.target.value)}
        />
        <div className="order-s1-in">
          <p>Sort by Order status</p>
          <select
            className="ordertxt"
            onChange={(e) => {
              setallorderstatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="ontheWay">On the Way</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="order-container">
        <div className="order-row_card1">
          <p className="ordertxt">OrderId</p>
          <p className="ordertxt">Paid</p>
          <p className="ordertxt">Delivery Boy Name</p>
          <p className="ordertxt">Delivery Boy PhoneNo</p>
          <p className="ordertxt">Cost</p>
          <button> Show Detail</button>
        </div>
        <div className="order-Container">
          {/**Showing Data here */}
          {alldata
            .filter((val) => {
              if (keyword === "") {
                return val;
              }
              if (!val.orderid || !val.orderStatus || !val.deliveryboy_name) {
                return false;
              }
              const orderidMatch = val.orderid
                .toLowerCase()
                .includes(keyword.toLowerCase());
              const statusMatch = val.orderStatus
                .toLowerCase()
                .includes(keyword.toLowerCase());
              const nameMatch = val.deliveryboy_name
                .toLowerCase()
                .includes(keyword.toLowerCase());
              return orderidMatch || statusMatch || nameMatch;
            })

            // .filter((val) => {
            //   if (allorderstatus === "") {
            //     return val;
            //   }
            //   if (!val.orderStatus) {
            //     return val;
            //   }

            //   const statusMatch = allorderstatus.orderStatus
            //     .toLowerCase()
            //     .includes(allorderstatus.toLowerCase());

            //   return statusMatch;
            // })

            .filter((val) => {
              if (allorderstatus === "") {
                return val;
              }
              if (!val.orderStatus) {
                return val;
              }

              const statusMatch = val.orderStatus
                .toLowerCase()
                .includes(allorderstatus.toLowerCase());

              return statusMatch;
            })

            // {alldata
            //     .filter((val) => {
            //         if (!val.orderid || !val.orderStatus || !val.deliveryboy_name) {
            //           return false;
            //         }
            //         if (keyword === "") {
            //           return true;
            //         }
            //         const orderidMatch = val.orderid.toLowerCase().includes(keyword.toLowerCase());
            //         const statusMatch = val.orderStatus.toLowerCase().includes(keyword.toLowerCase());
            //         const nameMatch = val.deliveryboy_name.toLowerCase().includes(keyword.toLowerCase());
            //         return orderidMatch || statusMatch || nameMatch;
            //       })

            .map((item) => {
              return (
                <div className="order_row_card">
                  <p className="ordertxt_item">{item.orderid}</p>
                  <p className="ordertxt_item">{item.orderPayment}</p>
                  <div className="order-car-in">
                    {item.orderStatus === "Pending" && (
                      <select
                        className="ordertxt02"
                        onChange={(e) =>
                          changeOrderStatus(item.orderid, item, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                    {item.orderStatus === "On The Way" && (
                      <select
                        className="ordertxt02"
                        onChange={(e) =>
                          changeOrderStatus(item.orderid, item, e.target.value)
                        }
                      >
                        <option value="On The Way">On the Way</option>
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                    {item.orderStatus === "Delivered" && (
                      <select
                        className="ordertxt02"
                        nChange={(e) =>
                          changeOrderStatus(item.orderid, item, e.target.value)
                        }
                      >
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="On The Way">On the Way</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                    {item.orderStatus === "Cancelled" && (
                      <select
                        className="ordertxt02"
                        nChange={(e) =>
                          changeOrderStatus(item.orderid, item, e.target.value)
                        }
                      >
                        <option value="Cancelled">Cancelled</option>
                        <option value="Pending">Pending</option>
                        <option value="On The Way">On the Way</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    )}
                  </div>
                  {item.deliveryboy_name ? (
                    <p className="ordertxt_item">{item.deliveryboy_name}</p>
                  ) : (
                    <input
                      type="text"
                      placeholder=" Enter DeliveryBoy Name "
                      className="inputtxt"
                      onBlur={(e) => {
                        DeliveryBoyName(item.orderid, item, e.target.value);
                      }}
                    />
                  )}
                  {item.deliveryboy_Phone ? (
                    <p className="ordertxt_item">{item.deliveryboy_Phone}</p>
                  ) : (
                    <input
                      type="text"
                      placeholder=" Enter DeliveryBoy Phone No "
                      className="inputtxt"
                      onBlur={(e) => {
                        DeliveryBoyPhone(item.orderid, item, e.target.value);
                      }}
                    />
                  )}
                  <p className="ordertxt_item">{item.orderCost}</p>
                  <Link to={`/orderDetails/${item.orderid}`}>
                    <button className="showdetailsbtn">Show details</button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
