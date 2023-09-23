const mongoose=require('mongoose')

const productlist=new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:'String',required:true},
    weight:{type:'String'},
    price:{type:'Number'},
    image:{type:'String'}
})

let productModel=mongoose.model('products',productlist);
module.exports={mongoose,productModel}

