import { FC, ReactNode, useEffect } from "react";
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
      document.title = "Your Fancy Dictionary";
    }
  }, [props.title]);

  return (
    <>
      <HeaderAndNav />
      <main>
        <section className="content">{props.children}</section>
      </main>
    </>
  );
};

export default Page;
