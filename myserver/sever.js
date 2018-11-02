var express=require("express");
var app=express();
var data=require("../data/data.json")
app.get("/seller",function (req,res) {
  res.send(JSON.stringify(data.seller));
})
app.get("/goods",function (req,res) {
  res.send(data.goods);
})
app.get("/ratings",function (req,res) {
  res.send(data.ratings);
})
app.listen(9999);
