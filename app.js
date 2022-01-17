const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")
const app = express()

const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/todolistdb')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



const itemSchema = {
name:String
}

const Item = mongoose.model("Item",itemSchema)

const item1 = new Item({
  name:"Get Up"
})

const item2 = new Item({
  name:"Cook Food"
})

const item3 = new Item({
  name:"Eat Food"
})

const defaultItems = [item1,item2,item3]


app.get("/",function (req,res) {
    let day = date.getDate()
    Item.find({}, function (err,foundItems){
      if(foundItems.length==0){
        Item.insertMany(defaultItems , function (err){
           if(!err){
             res.redirect("/")
           }
        })
        
      }
      res.render("List",{listTitle:day,newListItems:foundItems})
    })
   
   
  })

  app.post("/",function (req,res) {
    const itemName = req.body.newItem
    const item = new Item({
      name:itemName
    })
     
    item.save()
    res.redirect("/")
     
    })

    app.get("/work",function (req,res) {
        res.render("List",{listTitle:"Work List",newListItems:workItems})
    })
   
    app.post("/delete",function (req,res){
      const checkedId = req.body.checked

      Item.findByIdAndRemove(checkedId, function (err){
        if(!err){
         
        }
      })
      res.redirect("/")
    })
   
   // Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
