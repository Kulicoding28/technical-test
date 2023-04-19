import React from "react";
import Alert from "../../components/global/alert";
import Header from "../../components/global/header";
import Contents from "../../components/home-page/contents";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Contents />
      <Alert />
    </div>
  );
}
