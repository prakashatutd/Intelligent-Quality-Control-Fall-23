import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import DataTable from "../components/DataTable";
import DataGraphs from "../components/DataGraphs";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // Fetch data from the serverless function
        const response = await fetch("/api/data");
        const dat = await response.json();
        console.log(dat);

        setData(dat);
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          props: {
            data: [],
          },
        };
      }
    }

    getData();
  }, []);
  return (
    <>
      <Head>
        <title>IQDS Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h4>Intellegent Quality Detection System Dashboard</h4>

        <DataGraphs data={data}></DataGraphs>

        <div style={{ paddingTop: "1rem" }}>
          <DataTable data={data}></DataTable>
        </div>
      </main>
    </>
  );
}
