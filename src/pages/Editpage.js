import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import env from '../environment';
import Initialvalues from '../initialvalues';
import { useLocation } from 'react-router-dom';

function Editpage() {
  const location = useLocation();
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  const itemData = location.state.itemData;

  
  
  const formik = useFormik({
    initialValues:{
      name:itemData.name,
    weight: itemData.weight,
    price: itemData.price,
    image: itemData.image,
    id:itemData._id
    },
    onSubmit: async (values) => {
      console.log(values)
      
      let res=await axios.put(`${env.apiURL}/users/update`,values);
          console.log(res.data)
           if(res.data.statusCode===200){
             setToggle(false);
             setMessage(res.data.message);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        
          else{
            setToggle(false);
            setMessage(res.data.message);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
    },
  });

  return (
    <div className="form">
    <form onSubmit={formik.handleSubmit}>
      <div>
      <label htmlFor="firstName">Product Name</label>
      <input
        className="textbox1"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      </div>
      <div>
      <label htmlFor="lastName">Weight</label>
      <input
        className="textbox1"
        name="weight"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.weight}
      />
      </div>
      <div>
      <label htmlFor="email">Price</label>
      <input
        className="textbox1"
        name="price"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.price}
      />
      </div>
      <div>
      <label htmlFor="email">Image URL</label>
      <input
        className="textbox1"
        name="image"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.image}
      />
      </div>
      <button type="submit">Submit</button>

    </form>
    </div>
  )
}

export default Editpage