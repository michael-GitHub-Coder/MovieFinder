import { Link } from "react-router-dom"

const Navbar = () => {
    return(
      <>
      <nav className="bg-blue-700 p-4 fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-bold">MyLogo</div>
          <div className="space-x-4 hidden md:flex">
            <Link to="/" className="text-white hover:text-gray-400">Home</Link>
            <Link to="/movies" className="text-white hover:text-gray-400">Movies</Link>
            <Link to="#" className="text-white hover:text-gray-400">Contact</Link>
          </div>
          <button className="md:hidden text-white" aria-label="Toggle menu">
          </button>
        </div>
      </nav>
      
      <section className="bg-blue-600 mx-4 md:mx-24 text-white flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-24 h-2/3">
            <div className="relative text-center w-full max-w-[54rem]">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 mt-8 md:mt-12">Welcome.</h1>
                <div className="relative w-full md:max-w-2xl">
                <input
                    className="w-full rounded-full p-3 pl-7 pr-32 text-black focus:outline-none"
                    placeholder="Search for a movie,tv show, series....."
                />
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 rounded-full bg-blue-800 text-white p-3 hover:bg-blue-900">
                    Search
                </button>
                </div>
            </div>
        </section>
      </>

    )
}
export default Navbar

