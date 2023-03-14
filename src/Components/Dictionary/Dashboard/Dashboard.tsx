import { FC } from "react";
import { Page } from "../../Page";
import { NavLink } from "react-router-dom";
import "./styles.scss";

interface DashboardProps {
  title?: string;
}

const Dashboard: FC<DashboardProps> = (props) => {
  return (
    <Page title={props.title}>
      <div className="dashboard">
        <div className="row borderBottom">
          <NavLink to="/add-word">Add Word</NavLink>
        </div>
        <div className="row halfRow">
          <NavLink to="/bring-to-mind">Bring To Mind</NavLink>
        </div>
        <div className="row halfRow borderLeft">
          <NavLink to="/exam">Exam</NavLink>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
