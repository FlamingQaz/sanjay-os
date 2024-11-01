"use client"

import { useState } from "react";

import Background from "./components/background";
import HomeScreen from "./components/home";
import TopMenu from "./components/top-menu";

export default function HomePage() {
  const [topMenuOpen, setTopMenuOpen] = useState(false);

  return (
    <>
      <Background blur={true} />
      <TopMenu open={topMenuOpen} />
      <HomeScreen openTopMenu={setTopMenuOpen} isTopMenuOpen={topMenuOpen} />
    </>
  );
}
