// Components
import '../styles/globals.css'
import { collection, getDocs } from "firebase/firestore";

const MyApp = ({Component, pageProps}) => {
  return <Component {...pageProps} />
}

export default MyApp
