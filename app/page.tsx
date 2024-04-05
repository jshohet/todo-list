import Header from "./components/Header";
import FirstTime from "./components/FirstTime";
import Footer from "./components/Footer";
import AddToDo from "./components/AddToDo";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="h-screen">
      <Header /> 
      <FirstTime />
      <Sidebar />
      <AddToDo />
      <Footer />
    </main>
  );
}
