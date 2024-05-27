"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { signIn, signOut, useSession  } from 'next-auth/react';
import dynamic from 'next/dynamic';
import ChartUtils from "@/utils/ChartUtils";
import AuthWrapper from "./pages/auth/AuthWrapper";
import Dashboard from "./pages/dashboard/Dashboard";

const Main = () => {

  return (
   <AuthWrapper >
    <Dashboard/>
   </AuthWrapper>
  );
};

export default Main;

