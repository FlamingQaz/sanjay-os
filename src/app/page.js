"use client"

import { useState, useEffect } from "react";

import Background from "./components/background";
import HomeScreen from "./components/home";
import TopMenu from "./components/top-menu";

export default function HomePage() {
  const [topMenuOpen, setTopMenuOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  if (!isMounted) return null;

  return (
    <>
      <Background blur={true} />
      <TopMenu open={topMenuOpen} />
      <HomeScreen openTopMenu={setTopMenuOpen} isTopMenuOpen={topMenuOpen} />
    </>
  );
}
