const express = require("express")
const router=express.Router();
const Issue=require("../models/Issue");
const ReturnBook=require("../models/Return")
const Book=require("../models/book");
const Notification = require('../models/notification');
const Student=require('../models/student')
const auth = require('../middleware/auth'); // This is your modified middleware

//to issue a book --> USER
router.post("/issueRequest",async (req,res)=>{
    const { title,author,publisher,userId,bookId,userBranch,userName,isRecom,copies } = req.body ;
    const book = await new Issue({
        title,author,publisher,userId,bookId,userBranch,userName,isRecom,copies
    })
    await book.save();
    res.status(201).json(book);
})

// router.post("/returnreq",async(req,res)=>{
//     console.log(req)
//     const {title,author,publisher,userName,userBranch,userId,bookId}=req.body
//     const returnBook=await new ReturnBook({title,author,publisher,userName,userBranch,userId,bookId});
//     await returnBook.save()
//     res.status(201).json(returnBook);
// })


router.get("/allreturnedBook" ,(req,res)=>{
    ReturnBook.find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//list of books issued by a student -->USER
router.get("/issueBooks", auth ,(req,res)=>{
    Issue.find({ userId: req.user._id })
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//list of all books issued by students --->ADMIN
router.get("/allIssuedBook" ,(req,res)=>{
    Issue.find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//list of all issue requests --->ADMIN
router.get("/allIssueRequest" ,(req,res)=>{   
    Issue.find()
    .then(admins => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//return the book --> USER
router.post("/issuedBookDelete" , async(req,res)=>{
     const {postId} = req.body ;         
     try {
        const issue=await Issue.findOneAndDelete({ bookId: req.body.postId }) ;
        const book = await Book.findOne({_id : postId}) ;
        book.copies += 1 ;
        await book.save();
        const userId=issue.userId;
        const genre=book.genre;
        const department=book.department;
        const author=book.author;
        const returnBook= await new ReturnBook({userId,postId,genre,author,department});
        res.send("you successfully return the book")
     } catch (error) {
        console.log(error);
     }   
})

//to allow a student issue book-->admin
router.post("/issuedReqAccept", async(req, res) => {
    const {postId,bookId} = req.body ;
    try {
        const issue = await Issue.findOne({_id : postId})
        const book = await Book.findOne({_id : bookId})
        book.copies -= 1 ;
        await book.save();
        issue.isIssue = true
        await issue.save()
        const user=await Student.findOne({_id:issue.userId})
        if (user) {
          // Create a new notification
          const notification = new Notification({
              userId: user._id,
              message: `Your request to issue "${book.title}" has been accepted.`,
              type: 'ISSUE_ACCEPTED',
              read: false
          });
          await notification.save();
      }

        res.send('issue Delivered Successfully')
    } catch (error) {
        return res.status(400).json({ message: error}); 
    }
});

//to deny a student issue a book-->ADMIN
router.post("/issueReqDelete" , async(req,res)=>{ 
    try {
       await Issue.findOneAndDelete({ _id: req.body.postId }) ;     
       res.send("you successfully return the book")
    } catch (error) {
       console.log(error);
    }  
})

// router.post("/issuedBook", async(req, res) => {
//     const postId = req.body.postId
//     try {
//         const book = await Book.findOne({_id : postId})
//         console.log(book)
//         book.isIssue = true
//         await book.save()
//         res.send('book issued Successfully')
//     } catch (error) {
//         return res.status(400).json({ message: error});   
//     } 
// });

//to get a given issued book by the user
router.post("/singleIssuedBook", async(req, res) => {
    const postId = req.body.postId 
    try {
        const book = await Book.findOne({_id : postId});
        res.json(book)
    } catch (error) {
        return res.status(400).json({ message: error});        
    }
});


//get notifications-->USER
router.get('/notifications', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//marking the notification as read-->USER
router.put('/notifications/:id/read', auth, async (req, res) => {
  console.log("RequestBody:",req)
  try {
      const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    console.log("Notification1:",notification)
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();
    console.log("Notification2:",notification)
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//return the book notification-->ADMIN
router.post("/returnReq", async (req, res) => {
    const { bookId, userId, due } = req.body;
    try {
        const book = await Book.findOne({ _id: bookId });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const user = await Student.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new notification
        const notification = new Notification({
            userId: user._id,
            message: `You need to return the book "${book.title}" and pay a due of ${due}.`,
            type: 'RETURN_REQUEST',
            read: false
        });
        await notification.save();

        res.send('Return request delivered successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;



module.exports = router;