import logo from './logo.svg'

function App() {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md animate-bg-change">
        Hello World - Deployment 2
      </h1>
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-spin-slow"
          alt="logo"
        />
        <p className="text-white text-lg font-normal drop-shadow-none">
          Edit <code className="bg-transparent">src/App.tsx</code> and save to reload
        </p>
        <p className="text-white text-lg font-normal drop-shadow-none">
          Naif is all powerful now!!
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Tanstack
        </a>
      </header>
    </div>
  )
}

export default App