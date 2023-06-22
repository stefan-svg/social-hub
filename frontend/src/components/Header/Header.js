import React, { useState } from 'react';
import "./Header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  const userDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    search(query);
  };

  const search = async (query) => {
    try {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }

      const response = await axios.get(`http://localhost:8080/search?searchTerm=${query}`);
      const results = response.data;
      setSearchResults(results);
      console.log(results)
    } catch (error) {
      console.log("Error occurred during search:", error);
    }
  };

  return (
    <header>
      <div className="header-left">
        <form className="header-search">
          <input
            type="text"
            placeholder="Pretraži"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="header-right">
        <div className="header-profile-picture">
          <img onClick={userDetails} src={user.profilePicture} alt="" />
          {isOpen ? (
            <div className="user-details" onClick={handleInputClick}>
              <input type="text" />
            </div>
          ) : null}
        </div>
        <div className="logout">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
            }}
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
