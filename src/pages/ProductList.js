import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import env from "../environment";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import Initialvalues from "../initialvalues";

function ProductList() {
  let [data, setData] = useState([]);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  // let [imageurl, setimageurl] = useState([]);

  let loaddata = async () => {
    let res = await axios.get(`${env.apiURL}/users/all`);
    console.log(res.data.allproducts);
    if (res.data.statusCode === 200) {
      setData(res.data.allproducts);
    } else {
      alert(res.data.message);
    }
  };
  let handleClick = () => {
    console.log("clicked");
    navigate("/create");
  };

  useEffect(() => {
    loaddata();
  }, []);

  const imageStyle = {
    width: "70px",
    height: "70px",
  };
  const formik = useFormik({initialValues: Initialvalues})
  let handleeditChange=async(index, itemData)=>{
    console.log("clicked");
    navigate('/edit', { state: { itemData } });
  }
   let handleDelete=async(name) => {
    await axios.delete(`${env.apiURL}/users/delete/${name}`);
    }
 

  return (
    <div>
      <div className="login-wrapper">
        <h1>Products Page </h1>
        <div>
          <Button color="primary" onClick={handleClick}>
            Add Product
          </Button>
        </div>
        <div>
          <Button color="primary" onClick={loaddata}>
            Table Refresh
          </Button>
        </div>
      </div>
      <Table light>
        <thead>
          <tr className="firstrow">
            <th>#</th>
            <th>Name</th>
            <th>weight</th>
            <th>Price</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td onChange={formik.handleChange} value={formik.values.weight}>
                  {e.weight}
                </td>
                <td onChange={formik.handleChange} value={formik.values.price}>
                  {e.price} 
                </td>
                <td onChange={formik.handleChange} value={formik.values.image}>
                  <img src={e.image} alt="My Image" style={imageStyle} />
                  
                </td>
                <td>
                <ModeEditIcon onClick={() => handleeditChange(i,e)}/>
                </td>
                <td >
                  <DeleteIcon onClick={() => handleDelete(e.name)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
