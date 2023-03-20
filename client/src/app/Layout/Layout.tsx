import {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {NavBar} from "../../components/NavBar";
import {Footer} from "../../components/Footer";
import { Chat }  from '../../components/Chat/Chat'
import {MainPage} from '../../pages/MainPage/MainPage'
// import { Footer } from 'widgets/Footer';




interface LayoutProps {
  title?: string
}

export const Layout: FC<LayoutProps> = ({title}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen">
      <NavBar/>
      <div className="container mx-auto flex-grow flex flex-col">
        <div className="pt-24 flex-1 flex flex-col px-4">
          {title && <h1 className="text-3xl font-bold underline text-clifford">{title}</h1>}
          <Outlet />
        </div>
      </div>
      <Chat />
      <Footer/>
    </div>
  );
}
