import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from 'react'
import env from "../environment";
import { Button, Form, FormGroup, Input, Table, Spinner } from 'reactstrap';
import Initialvalues from "../initialvalues";


function Allpages() {
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  
    



  const formik = useFormik({
    initialValues: Initialvalues,
    onSubmit: async (values) => {
      console.log(values)
      let res=await axios.post(`${env.apiURL}/users/create`,values);
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
      {toggle?<Spinner animation="border" variant="primary" />:<></>}
        {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
      </div>
      
      <button type="submit">Submit</button>

    </form>
    </div>
  );
};

export default Allpages