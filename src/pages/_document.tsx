import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "~/components/Navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-blue-100">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
