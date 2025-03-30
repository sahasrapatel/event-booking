import React, { useState, useEffect } from "react";
import "./UserProfileModel.css";

function UserProfileModel({ onClose }) {
  const noProfilePic = "/images/no-dp-mood-off_9.jpg"; // Ensure the image is in public/images/

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "";
    const storedName = localStorage.getItem("username") || "";
    let storedProfilePic = localStorage.getItem("profilePic") || noProfilePic;

    setUser({ email: storedEmail, name: storedName, profilePic: storedProfilePic });
    setFormData({ email: storedEmail, name: storedName, profilePic: storedProfilePic });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("username", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("profilePic", formData.profilePic);

    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="user-profile-modal">
        <h2>User Profile</h2>

        {user ? (
          <>
            {isEditing ? (
              <div className="edit-section">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <div className="profile-section">
                <img 
                  src={user.profilePic} 
                  alt="User Profile" 
                  className="profile-pic" 
                  onError={(e) => e.target.src = noProfilePic} 
                />
                <div className="user-info">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="button-group">
                  <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
                  <button className="close-btn" onClick={onClose}>Close</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    </div>
  );
}

export default UserProfileModel;
