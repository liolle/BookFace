import React from "react";
// import GreenWave2 from '../images/GreenWave2.jpg'
import BottomNavigationBar from "../Components/Navigation/BottomNavigationBar";
import SideBar from "../Components/Navigation/SideBar";


const BookMarks: React.FC = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Modifier cette valeur en fonction de votre définition d'un écran de téléphone
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    // const backgroundImageStyle = {
    //     backgroundImage: `url("${GreenWave2}")`,
    //     backgroundSize: 'cover', 

    //   };
 

  return (
<div className=' flex flex-1 '>
    {isMobile ? (
       <BottomNavigationBar children={undefined} />
   ) : (
      <SideBar children={undefined} />
    )} 
    <div className="">
       
     
    </div>
</div>
  );
};

export default BookMarks;