import "../styles/global.css";
import UpButton from "../components/UpButton";
import MDXComponents from "../components/MDXComponents";
import { MDXProvider } from "@mdx-js/react";

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={MDXComponents}>
      <UpButton />
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
