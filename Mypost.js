import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import laptopImg from '../images/laptop.png';
import laptopImg2 from '../images/profile.jpeg';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../style/mypost.css'
const MyProfile = () => {
  const [blogs, setBlogs] = useState([
    {
      profileImg: laptopImg2,
      title: 'How To Make GUI In Java With Example',
      personImg: laptopImg,
      userName: '',
      publishDate: '2025-06-17',
    },
    {
      profileImg: laptopImg2,
      title: 'How To Make GUI In Java With Example',
      personImg: laptopImg,
      userName: '',
      publishDate: '2025-06-20',
    },
    {
      profileImg: laptopImg2,
      title: 'How To Make GUI In Java With Example',
      personImg: laptopImg,
      userName: '',
      publishDate: '2025-06-17',
    },
    {
      profileImg: laptopImg2,
      title: 'How To Make GUI In Java With Example',
      personImg: laptopImg,
      userName: '',
      publishDate: '2025-06-20',
    },
    {
      profileImg: laptopImg2,
      title: 'How To Make GUI In Java With  Example',
      personImg: laptopImg,
      userName: '',
      publishDate: '2025-06-17',
    },
    {
      profileImg: laptopImg2, 
      title: 'How To Make GUI In Java With Example Example',
      personImg: laptopImg,
      userName: '',
      publishDate: '2025-06-20',
    },

  ]);

  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    userName: '',
    publishDate: '',
    profileImg: null,
  });
  //  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
  const [blogsData, setBlogsData] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

const handleAddBlog = async () => {
  if (!newBlog.title || !newBlog.userName || !newBlog.publishDate || !newBlog.profileImg) {
    alert('Please fill all fields and select an image');
    return;
  }

  const formData = new FormData();
  formData.append('title', newBlog.title);
  formData.append('publishDate', newBlog.publishDate); 
  formData.append('author', newBlog.userName);   
  formData.append('image', newBlog.profileImg);  

  try {
    const response = await axios.post('http://localhost:5000/api/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setBlogsData((prev) => [response.data.data, ...(prev || [])]);
    setShowModal(false);
    setNewBlog({ title: '', userName: '', publishDate: '', profileImg: null });
  } catch (error) {
    console.error("Error uploading blog:", error.message);
  }
};
 useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/blog')
        console.log(response.data.data);
        setBlogsData(response.data.data)
      } catch (error) {
      }
    }
    getBlogs();
  }, [])
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/blog/${blogId}`);
      setBlogsData((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
  };

  return (
    <div className="container py-5">
      {/* Profile Header */}
      <div className="text-center mb-5">
        <img
          src={laptopImg2}
          alt="User Avatar"
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <h2 className="fw-bold">Jasmin</h2>
        <p className="text-muted">Welcome to your profile. Manage your blogs here.</p>
        <button className="btn btn-primary mt-2" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add New Blog
        </button>
      </div>

      {/* Blog Cards */}
      <div className="row g-4">
        {blogsData?.map((blog, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card shadow-sm h-100 border-0">
              <img
                src={`http://localhost:5001${blog.image}`}
                className="card-img-top"
                alt="Blog Cover"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <img
                    src={`http://localhost:5001${blog.image}`}
                    className="rounded-circle"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    alt="User"
                  />
                  <span className="text-muted small">{blog.author} • {blog.publishDate}</span>
                </div>
                <div className="mt-auto d-flex justify-content-end gap-2">
                  <button
                 className="btn btn-sm btn-outline-warning">
               <FaEdit className="me-1" /> Edit
              </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <FaTrash className="me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add Blog */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Blog</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label  text-dark">Blog Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter blog title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label  text-dark">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={newBlog.userName}
                    onChange={(e) => setNewBlog({ ...newBlog, userName: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label  text-dark">Publish Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newBlog.publishDate}
                    onChange={(e) => setNewBlog({ ...newBlog, publishDate: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark" >Blog Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => setNewBlog({ ...newBlog, profileImg: e.target.files[0] })}
                  />
                </div>
          </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddBlog}>Add Blog</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
