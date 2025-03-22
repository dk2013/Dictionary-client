import React, { FC } from "react";
import unauthenticatedUserIcon from "../../../Assets/Images/unauthenticated-user.svg";
import styles from "./Header.module.scss";

interface IHeaderProps {
  onAppMenuClick: () => void;
  onProfileMenuClick: () => void;
}

const Header: FC<IHeaderProps> = ({ onAppMenuClick, onProfileMenuClick }) => {
  return (
    <header className={styles.header}>
      <div
        className={styles.burgerIcon}
        id="burger-icon"
        onClick={() => onAppMenuClick()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className={styles.appTitle}>Fancy Dictionary</h1>
      <div
        className={styles.profileIcon}
        id="profile-icon"
        onClick={() => onProfileMenuClick()}
      >
        <img src={unauthenticatedUserIcon} alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
