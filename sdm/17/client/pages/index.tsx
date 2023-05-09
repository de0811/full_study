import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AppLayout from "@/components/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";

export default function Index() {
  return (
    <>
    <Head>
      <title>Home | SDM</title>
    </Head>
      <AppLayout>
        <div>index</div>
      </AppLayout>
    </>
  );
}
