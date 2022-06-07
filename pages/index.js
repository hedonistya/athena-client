import Head from 'next/head';

// Components
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <>
      <Head>
        <title>Athena</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainLayout/>
    </>
  )
};

export default Home;