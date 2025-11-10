import '../style/style.css';
import  laptop from '../images/laptop.png'
import profile from '../images/profile.jpeg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const data = [
  {
    profileImg: laptop,
    title: "How to make GUI in java example",
    personImg: profile,
    username: "ajay bisht",
    publishDate: "2025-06-07"
  },
  {
    profileImg: laptop,
    title: "How to make GUI in C example",
    personImg: profile,
    username: "jasmin",
    publishDate: "2025-06-11"
  },
  {
    profileImg: laptop,
    title: "How to make GUI in C++ example",
    personImg: profile,
    username: "ajay bisht",
    publishDate: "2025-06-12"
  },
  {
    profileImg: laptop,
    title: "How to make GUI in Python example",
    personImg: profile,
    username: "ajay bisht",
    publishDate: "2025-06-15"
  },
  {
    profileImg: laptop,
    title: "How to make GUI in Javascript example",
    personImg: profile,
    username: "jasmin",
    publishDate: "2025-06-21"
  },
  {
    profileImg: laptop,
    title: "How to make GUI in html example",
    personImg: profile,
    username: "jasmin",
    publishDate: "2025-06-27"
  },
];

function BlogMain() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [creator, setCreator] = useState('All');
  const [publishDate, setPublishDate] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState(data.map(() => []));
  const [newComment, setNewComment] = useState('');
  const [activePost, setActivePost] = useState(null);
  const [likes, setLikes] = useState(Array(data.length).fill(0));
  const [selectedBlog, setSelectedBlog] = useState(null);
const [showDetailsModal, setShowDetailsModal] = useState(false);
const navigate = useNavigate();

const toggleDropdown = () => {
  setShowDropdown(prev => !prev);
};

  
  useEffect(() => {
    const addBlog = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/blog', {
          title: 'Sample Blog Title',
          content: 'This is a test blog being added using useEffect.',
          author: 'ajay',
        });
        console.log('Blog added successfully:', response.data);
      } catch (error) {
        console.error('Error adding blog:', error.response?.data || error.message);
      }
    };

    addBlog();
  }, []);

  
  useEffect(() => {
    if (creator === 'All') {
      setFilteredData(data);
    } else {
      const result = data.filter(item => item.username === creator);
      setFilteredData(result);
    }
  }, [creator]);

  useEffect(() => {
    if (!publishDate) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.publishDate === publishDate);
      setFilteredData(filtered);
    }
  }, [publishDate]);

  const handleviewDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
    setSelectedBlog(response.data);
    setShowDetailsModal(true);
  } catch (error) {
    console.error("Error fetching blog by ID", error);
  }
};


  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index]++;
    setLikes(updatedLikes);
  };

  const handleOpenModal = (index) => {
    setActivePost(index);
    setOpenModal(true);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments];
      updatedComments[activePost].push(newComment);
      setComments(updatedComments);
      setNewComment('');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">💬 Chatterly</div>
        <div className="profile-dropdown">
 <div className="profile" onClick={toggleDropdown} style={{ cursor: 'pointer', position: 'relative' }}>
  Jasmin ⏷
  {showDropdown && (
    <div style={{
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '4px',
      zIndex: 1000,
    }}>
      <div onClick={() => navigate('/mypost')} style={{ padding: '5px 0', cursor: 'pointer' }}>My Profile</div>
      <div onClick={() => {
        localStorage.removeItem("user");
        navigate('/');
      }} style={{ padding: '5px 0', cursor: 'pointer' }}>Logout</div>
    </div>
  )}
</div>
</div>
      </header>

      <div className="filters">
        <div>
          <h4 style={{ marginBottom: "14px" }}>Filters</h4>
          <hr />
          <div className="custom-select-wrapper">
            <label>
              <span className="select-label">Created By</span><br />
              <select value={creator} onChange={(e) => setCreator(e.target.value)}>
                <option>All</option>
                <option>ajay bisht</option>
                <option>jasmin</option>
              </select>
            </label>
          </div>

          <div className="custom-select-wrapper">
            <label>
              <span className="select-label">Published Date</span><br />
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="date-input"
              />
            </label>
          </div>
        </div>

        <div className="search-container">
          <input type="text" placeholder="Type here" />
          <span className="search-icon">&#128269;</span>
        </div>
      </div>

      <div className="main-content">
          <h2>Blog Posts</h2>
          <div className="grid">
            {filteredData.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.profileImg} alt="Post" />
                <div className="card-body">
                  <div className="card-title">{item.title}</div>
                </div>
                <div className="card-footer">
                  <div className="user-info">
                    <img src={item.personImg} alt={item.username} />
                    <span>{item.username}<br /><small>{item.publishDate}</small></span>
                  </div>
                  <div className="engagement">
                    <button onClick={() => handleLike(index)} className='like-button'>❤ {likes[index]}</button>
                    <button onClick={() => handleOpenModal(index)}>💬</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {openModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Comments</h5>
                <button type="button" className="btn-close" onClick={() => setOpenModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {comments[activePost]?.map((cmt, idx) => (
                  <p key={idx}>💬 {cmt}</p>
                ))}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default BlogMain;
