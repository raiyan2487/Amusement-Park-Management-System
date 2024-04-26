import Header from "../components/HomeHeader";
import background from '../images/background.gif'
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Header />

      <div className="flex justify-center items-center">
        <h1 className="text-center text-5xl font-bold text-rgb-17-50-62 top-40 ml-5 text-black absolute">Welcome to Imagination Amusement Park!</h1>
      </div>

      <div className="h-screen flex items-center justify-center text-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>

      <About />
    </>
  )
}

export default Home;