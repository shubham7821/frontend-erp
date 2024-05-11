 
// import Image from "next/image";
// import logo from "../src/logo.svg";
 
// function react() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Image
//                     src={logo}
//                     className="App-logo"
//                     width={200}
//                     height={200}
//                     alt="logo"
//                 />
//                 <p>
//                     Edit <code>src/App.js</code> and save to
//                     reload.
//                 </p>
 
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }
 
// export default react;


import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <p>Welcome to React</p>
      <Footer />
    </div>
  );
}

export default App;
