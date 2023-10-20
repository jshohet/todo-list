import Image from "next/image";
import Header from "./components/Header";
import FirstTime from "./components/FirstTime";

export default function Home() {
  return (
    <main>
      <Header />
      <FirstTime />
    </main>
  );
}
