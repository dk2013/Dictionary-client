import { FC } from "react";
import { Page } from "../../Page";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Dashboard: FC = () => {
  return (
    <Page>
      <div className="row borderBottom">
        <NavLink to="/add-word">Add Word</NavLink>
      </div>
      <div className="row halfRow">
        <NavLink to="/get-to-know">Get To Know</NavLink>
      </div>
      <div className="row halfRow borderLeft">
        <NavLink to="/exam">Exam</NavLink>
      </div>
    </Page>
  );
};

export default Dashboard;
