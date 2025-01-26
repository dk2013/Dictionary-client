import { FC, ReactNode, useEffect } from "react";
import "./styles.scss";
// import { ____Header } from "../____Header";
import { HeaderAndNav } from "../HeaderAndNav";

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
    <>
      <HeaderAndNav />
      <main>
        {/*<____Header />*/}

        <section className="content">{props.children}</section>
      </main>
    </>
  );
};

export default Page;
