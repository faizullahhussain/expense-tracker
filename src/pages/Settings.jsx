import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import "./Settings.scss";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    // load saved profile if exists
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const p = JSON.parse(saved);
      setName(p.name || "");
      setEmail(p.email || "");
      setRole(p.role || "User");
      setBio(p.bio || "");
      setAvatarUrl(p.avatarUrl || "");
    }
  }, []);

  const saveProfile = () => {
    const profile = { name, email, role, bio, avatarUrl };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile saved");
  };

  const changePassword = () => {
    if (!newPass) return alert("Enter a new password");
    if (newPass !== confirmPass) return alert("Passwords do not match");
    // In a real app you'd call an API — here we'll just simulate
    localStorage.setItem("userPassword", newPass);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    alert("Password updated (simulated)");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result.toString());
    reader.readAsDataURL(file);
  };

  return (
    <section className="container">
      <h1 className="page-title">Settings</h1>
      <Breadcrumb />

      <div className="settings-grid profile-grid">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-wrap">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {(name && name[0].toUpperCase()) || "U"}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="profile-meta">
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              className="input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>

          <div className="profile-actions">
            <button className="save-btn" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>

        <div className="profile-card">
          <h2 className="page-title-sm">Security</h2>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              className="input"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="input"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="input"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <div className="profile-actions">
            <button className="save-btn" onClick={changePassword}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
