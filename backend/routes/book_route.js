const express=require("express")
const router=express.Router();
const Book=require("../models/book");
const Issue=require("../models/Issue");

router.post('/addBook', async(req,res)=>{
    const {title,author,publisher,copies,department,genre,description, vendor, vendor_id, publisher_id }=req.body;
        console.log("req.body",req.body)
    if(req.body._id){
        const obj=await Issue.find({_id})
        obj[0].isRecom=false
        await obj[0].save()
    }
    const book= await new Book({title,author,publisher,copies,department,genre,description, vendor, vendor_id, publisher_id })
    await book.save()
})

router.get("/allBook",(req,res)=>{
    Book.find().sort({createdAt:-1}).then(data=>{
        res.status(200).json(
            data
        );
    });
});

router.post("/bookDelete" , async(req,res)=>{
    const {postId} = req.body ;         
    try {
       await Book.findOneAndDelete({ _id : postId }) ;
       res.send("you successfully deleted the book")
    } catch (error) {
       console.log(error);
    }   
})

module.exports = router;