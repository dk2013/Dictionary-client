import { FC, ReactNode } from "react";
import "./styles.scss";
import { Header } from "../Header";

interface PageProps {
  children: ReactNode;
}

const Page: FC<PageProps> = (props) => {
  return (
    <main>
      <Header />
      <section className="content">{props.children}</section>
    </main>
  );
};

export default Page;
