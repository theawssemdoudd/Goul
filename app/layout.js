import Header from '@/components/Header';

import "./index.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <h1>Mon super magasin</h1>
        {children}
      </body>
    </html>
  );
}


export default RootLayout;
