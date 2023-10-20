import Image from "next/image";
import Header from "./components/Header";
import FirstTime from "./components/FirstTime";
import ToDoWrapper from "./components/ToDoWrapper";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <FirstTime />
      <ToDoWrapper />
      <Footer />
    </main>
  );
}
