const Blogmodal = require('../Modals/myprofile');
const blogschema = require('../Modals/myprofile');
const Blog= require('../Modals/myprofile');

const path= require('path');

exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body; 
    if (!title || !content || !author || !req.file) {
      return res.status(400).json({ error: 'All fields and image are required' });
    }
const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    //const imagePath = req.file.path;  store file path

    const newBlog = new Blog({
      title,
      content,
      author,
      image: imagePath, // save in MongoDB
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog', details: error.message });
  }
};

exports.getBlog = async(req,res)=>{
    try{
        const blogs= await Blogmodal.find();
        res.status(200).json({success: true, data: blogs});
    } catch(error){
        console.error('Error fetching blogs:',error);
        res.status(500).json({success: false,message: 'Server Error'});
    }
}

exports.deleteBlog = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const deleteBlog = await Blog.findByIdAndDelete(blogId);
        if(!deleteBlog){
            return res.status(404).json({error: "Blog not found"});
        }
        res.status(200).json({success: true, message:"Blog deleted succesfully"});
    }
    catch(error){
        res.status(500).json({error:"Error deleting blogs",details:error.message});
    }
}

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog', details: error.message });
  }
};

exports.getBlogsbyId = async(req,res)=>{
    const blogId = req.params.id;
    try {
        if(blogId.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({message : "Invalid Blog Id Format"});
    }
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message }); 
}
}
