import Header from "../components/HomeHeader";
import background from '../images/background.gif'
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Header />

      <div className="font-color-special flex justify-center items-center relative" style={{ zIndex: 1, top: '50px' }}>
        <h1 className="bowlby-one-sc-regular text-center text-7xl font-bold ml-5  absolute " style={{ top: '280px' }}>Welcome</h1>
        <h1 className="bowlby-one-sc-regular text-center text-7xl font-bold ml-5  absolute" style={{ top: '391px' }}>To</h1>
        <h1 className="bowlby-one-sc-regular text-center text-7xl font-bold ml-5  absolute" style={{ top: '500px' }}>Imagination Amusement Park!</h1>
      </div>

      <div className="blur-sm h-screen flex items-center justify-center text-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>

      <About />
    </>
  )
}

export default Home;