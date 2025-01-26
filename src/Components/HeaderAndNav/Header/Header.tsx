import React, { FC } from "react";
import unauthenticatedUserIcon from "../../../assets/images/unauthenticated_user.svg";
import styles from "./Header.module.scss";

interface IHeaderProps {
  onAppMenuClick: () => void;
  onProfileMenuClick: () => void;
}

const Header: FC<IHeaderProps> = ({ onAppMenuClick, onProfileMenuClick }) => {
  return (
    <header>
      <div
        className="burger-icon"
        id="burger-icon"
        onClick={() => onAppMenuClick()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="app-title">Fancy Dictionary</h1>
      <div
        className="profile-icon"
        id="profile-icon"
        onClick={() => onProfileMenuClick()}
      >
        <img
          className={styles.profileIcon}
          src={unauthenticatedUserIcon}
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default Header;
