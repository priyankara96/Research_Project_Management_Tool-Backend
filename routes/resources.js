const express = require("express");
const Posts = require("../models/resources");

const router = express.Router();

//save posts

router.post("/resources/save", (req, res) => {
  let newPost = new Posts(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "post save successfully",
    });
  });
});

//get posts

// router.get("/resources", (req, res) => {
//   Posts.find().exec((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       existingPosts: posts,
//     });
//   });
// });

router.get("/resources", async (req, res) => {
    try {
        const allResources = await Posts.find(req.params);
        res.json(allResources);
        console.log("result , ", allResources);
    } catch (err) {
        console.log("error in get reservations", err);
        res.status(204).send({ message: "failed", data: err });
    }
});

//get a specific post

router.get("/resources/:id", (req, res) => {
  let postId = req.params.id;

  Posts.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

//update posts

router.put("/resources/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: "Update Succesfully",
      });
    }
  );
});

//delete post

router.delete("/resources/delete/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "delete is successful",
      deletedPost,
    });
  });
});

module.exports = router;
