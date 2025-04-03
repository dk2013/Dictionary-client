import { FC } from "react";
import { Page } from "../../Page";
import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import classNames from "classnames";

interface IDashboardProps {
  title?: string;
}

const Dashboard: FC<IDashboardProps> = (props) => {
  return (
    <Page title={props.title}>
      <div className={classNames(styles.contentTitle)}>
        Welcome to Fancy Dictionary
      </div>
      <p className={classNames(styles.contentDescription)}>
        This version of the dictionary app includes a playful gradient, a custom
        Google font, pastel side menus, and a range of fancy controls below.
        We’ve added a select, input, table, buttons, radio, toggle, and a range
        slider—all in a fun pastel style.
      </p>

      <div className="button-section">
        <div>
          <NavLink className="styled-btn fancy-btn width-80" to="/add-word">
            Add Word
          </NavLink>
        </div>
        <div>
          <NavLink
            className="styled-btn fancy-btn width-80"
            to="/bring-to-mind"
          >
            Bring To Mind
          </NavLink>
        </div>
        <div>
          <NavLink className="styled-btn fancy-btn width-80" to="/exam">
            Check Yourself
          </NavLink>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
