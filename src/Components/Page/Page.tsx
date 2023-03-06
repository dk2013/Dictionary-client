import { FC, ReactNode, useEffect } from "react";
import "./styles.scss";
import { Header } from "../Header";

interface PageProps {
  children: ReactNode;
  title?: string;
}

const Page: FC<PageProps> = (props) => {
  useEffect(() => {
    if (props.title?.length) {
      document.title = props.title;
    } else {
      // set default title
      document.title = "Your Dictionary";
    }
  }, [props.title]);

  return (
    <main>
      <Header />
      <section className="content">{props.children}</section>
    </main>
  );
};

export default Page;
