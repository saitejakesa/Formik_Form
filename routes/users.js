var express = require('express');
const {mongoose,productModel}=require('../dbSchema')
const {mongodb,dbName,dbUrl}=require('../dbConfig')
var router = express.Router();
// let id= mongoose.Schema.Types.ObjectId;

/* GET users listing. */
router.post('/create', async(req,res)=>{
  await mongoose.connect(dbUrl)
  console.log(req.body)
  try{
    let productavailability=await productModel.find({name:req.body.name, weight:req.body.weight});
    if(productavailability.length>0){
      res.send({
        statusCode:200,
        message:"Product Already registered"
      })
    }
    else{
      req.body._id = new mongoose.Types.ObjectId();
      let addingProduct=await productModel.create(req.body)
      console.log(addingProduct)
      res.send({
        statusCode:200,
        name:req.body.name,
        weight:req.body.weight,
        price:req.body.price,
        image:req.body.image,
        message:"Product Created Succesfully"
      })
    }
    
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.get('/all',async(req,res)=>{
  await mongoose.connect(dbUrl)
  try{
    let allproducts=await productModel.find().lean()
    // console.log(allproducts)
    res.send({
      statusCode:200,
      allproducts,
    })
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})


router.put('/update', async(req,res)=>{
  await mongoose.connect(dbUrl)
  try{
    
    let checkout=await productModel.findOneAndUpdate(
      {_id: req.body.id},{name:req.body.name,weight:req.body.weight,price:req.body.price, image:req.body.image })
        res.send({
          statusCode:200,
          data:checkout,
          message:"Updated succesfull"
        })
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.delete('/delete/:name', async(req,res)=>{
  await mongoose.connect(dbUrl)
  try{
    let deleteprod=await productModel.findOneAndDelete(
      {name: req.params.name})
        res.send({
          statusCode:200,
          message:"Deleted Succesfully"
        })
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})


module.exports = router;
