import React, { useState } from "react";
import "./AddFood.css";

// FIREBASE IMPORTS
import { db, storage } from "../FireBase/FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "./NavBar/Navbar";

const AddFood = () => {
  const [randomid, setrandomid] = useState("");
  // let RandomNumber = Math.floor(100000 + Math.random() * 900000);
  const [allfoodData, setallfoodData] = useState({
    food_Name: "",
    food_Price: "",
    food_description: "",
    food_imageUrl: "",
    food_categories: "",
    // restaurant_address: "",

    //
    food_type: "",
    meal_type: "",
    food_addon: "",
    foodAddon_price: "",
    //
    restaurant_name: "",
    restaurant_phone: "",
    restaurant_email: "",
    restaurant_address_building: "",
    restaurant_address_street: "",
    restaurant_address_city: "",
    restaurant_address_pincode: "",
    // id: randomid,
    // id: new Date().getTime().toString(),
    //
  });
  const [food_image, setfood_image] = useState(null);

  // calling btn function
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(100000 + Math.random() * 900000);
    setrandomid(id);

    if (
      food_image == null ||
      allfoodData.food_Name === "" ||
      allfoodData.food_Price === "" ||
      allfoodData.food_categories === "" ||
      allfoodData.food_description === "" ||
      // allfoodData.restaurant_address === "" ||
      allfoodData.restaurant_name === "" ||
      allfoodData.restaurant_phone === ""
    ) {
      alert("Please Select Image First Or fill All Fields");
      return;
    } else {
      //FIRST WE GENERATE THE IMAGE PATH gENERATEING IMAGE NAME
      const imageRef = ref(storage, `FoodImage/${food_image.name}`);
      // SECOND WE UPLOAD THE IMAGE
      uploadBytes(imageRef, food_image)
        //THIRS IS TO GENERATE  IMAGE URL
        .then(() => {
          //   alert("Image Upload SuccessFully");
          // PRINT THE URL
          getDownloadURL(imageRef).then((url) => {
            console.log(url);
            setallfoodData({
              ...allfoodData,
              food_imageUrl: url,
            });

            const foodData = {
              ...allfoodData,
              food_imageUrl: url,
              id: randomid,
            };

            try {
              const docRef = addDoc(collection(db, "foodDataColl"), foodData);
              alert("data add successfully", docRef.id);
            } catch (err) {
              alert("This Error is Comes From uploading the data", err);
            }
          });
        })
        .catch((err) => {
          alert("something is wrong while Uploading image", err);
        });
    }

    // console.log(foodData);
  };

  return (
    <div>
      <Navbar />
      <div className="Form_Outer">
        <h1>Add Food Details..</h1>
        <form className="Inner_Form">
          <label>Food Name</label>
          <input
            type="text"
            name="food_name"
            className="InputTextBox"
            onChange={(e) => {
              setallfoodData({
                ...allfoodData,
                food_Name: e.target.value,
              });
            }}
          />
          <br />
          <label>Description</label>
          <input
            type="text"
            name="food_description"
            className="InputTextBox"
            onChange={(e) => {
              setallfoodData({
                ...allfoodData,
                food_description: e.target.value,
              });
            }}
          />
          <br />
          <div className="form-row">
            <div className="form-col">
              <label>Food Categories</label>

              <select
                name="food_categories"
                className="Selected_Form"
                onChange={(e) =>
                  setallfoodData({
                    ...allfoodData,
                    food_categories: e.target.value,
                  })
                }
              >
                <option value="null"> select your Food Categories</option>
                <option value="indian">Indian Dish</option>
                <option value="chinese">Chinese Dish</option>
                <option value="amrican"> American Dish</option>
                <option value="russian"> Russian Dish</option>
              </select>
            </div>
            <div className="form-col">
              <label>Food Type</label>
              <select
                name="food-type"
                className="Selected_Form"
                onChange={(e) =>
                  setallfoodData({ ...allfoodData, food_type: e.target.value })
                }
              >
                <option value="null">Select Food type</option>
                <option value="veg">Veg</option>
                <option value="Non-veg">Non-Veg</option>
              </select>
            </div>
          </div>

          <br />
          <div className="form-row">
            <div className="form-col">
              <label>Food Price</label>
              <input
                type="text"
                name="food_price"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    food_Price: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-col">
              <label>Meal type</label>
              <select
                name="meal_type"
                className="Selected_Form"
                onChange={(e) =>
                  setallfoodData({ ...allfoodData, meal_type: e.target.value })
                }
              >
                <option value="null">Select Food type</option>
                <option value="breakFast">breakFast</option>
                <option value="brunch">brunch</option>
                <option value="lunch">lunch</option>
                <option value="snacks">snacks</option>
                <option value="dinner">dinner</option>
                <option value="Disert">Disert</option>
              </select>
            </div>
          </div>

          <br />

          <div className="form-row">
            <div className="form-col">
              <label>Add On Name</label>

              <input
                type="text"
                name="foodAddon_name"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    food_addon: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-col">
              <label>Food addOn Price</label>
              <input
                type="text"
                name="foodAddon_price"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    foodAddon_price: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <br />
          <label>Food Image</label>
          <input
            type="file"
            name="food_image"
            className="InputTextBox"
            onChange={(e) => {
              // setallfoodData({
              //   ...allfoodData,
              //   food_image: e.target.files[0],
              // });
              setfood_image(e.target.files[0]);
            }}
          />
          <br />

          <label>Restaurant Name</label>
          <input
            type="text"
            name="restaurant-name"
            className="InputTextBox"
            onChange={(e) => {
              setallfoodData({
                ...allfoodData,
                restaurant_name: e.target.value,
              });
            }}
          />
          <br />

          <div className="form-row">
            <div className="form-col">
              <label>Restaurant Building Number/Name</label>

              <input
                type="text"
                name=" restaurant_address_building"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    restaurant_address_building: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-col">
              <label>Restaurant Street Address</label>
              <input
                type="text"
                name="restaurant_address_street"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    restaurant_address_street: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <br />
          <div className="form-row">
            <div className="form-col">
              <label>Restaurant City</label>

              <input
                type="text"
                name="restaurant_address_city"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    restaurant_address_city: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-col">
              <label>Restaurant PinCode</label>
              <input
                type="text"
                name="restaurant_address_pincode"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    restaurant_address_pincode: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <br />
          <div className="form-row">
            <div className="form-col">
              <label>Restaurant Phone No. </label>
              <input
                type="tel"
                name="restaurant_phone"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    restaurant_phone: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-col">
              <label>Restaurant Email</label>
              <input
                type="text"
                name="restaurant_email"
                className="Selected_Form"
                onChange={(e) => {
                  setallfoodData({
                    ...allfoodData,
                    restaurant_email: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <br />

          <br />
          <button className="AddBtn" onClick={handleSubmit}>
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
