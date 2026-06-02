import "./TagInput.scss";
import { MdClose } from "react-icons/md";
import { FiTag } from "react-icons/fi";

export default function TagInput({ tags, setTags }) {
  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.target.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tag-input-container">
      <label className="label-with-icon">
        <FiTag /> Tags
      </label>
      <div className="tag-input-wrapper">
        <input
          type="text"
          className="tag-input"
          placeholder="Add tags (press Enter)"
          onKeyDown={handleAddTag}
        />
        <div className="tags-display">
          {tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
              <MdClose
                className="tag-close"
                onClick={() => handleRemoveTag(tag)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
