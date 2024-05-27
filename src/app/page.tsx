"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { signIn, signOut, useSession  } from 'next-auth/react';
import dynamic from 'next/dynamic';
import ChartUtils from "@/utils/ChartUtils";
import Dashboard from "./pages/dashboard/Dashboard";

const Main = () => {

  return (
 
    <Dashboard/>
   
  );
};

export default Main;

