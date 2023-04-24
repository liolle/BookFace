import React from "react";
import { useState } from "react";
import PostData from "../Components/Publication/PostData";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import classNames from "classnames";
import Publication from "../Components/Publication/Publication";
import SideBarStat from "../Components/SideBar/SideBarStat";
import BottomNavigationBar from "../Components/BottomNavigationBar/BottomNavigationBar"
import GalleryCard from "../Components/GalleryCard/GalleryCard";
import Followings from "../Components/Followings/Followings";
import people from "../Components/Followings/people";
import GreenWave2 from "../images/GreenWave2.jpg";
import SearchBar from "../Components/Search/SearchBar";



interface ProfileProps {
  data: PostData;
}


const Profile: React.FC<ProfileProps> = ({ data }) => {
  const [active, setActive] = useState(0);

  const [post, setPost] = useState("");
  const [post1, setPost1] = useState<null | React.ReactNode>(null);
  const [post2, setPost2] = useState("");

  let post_example = {
    id: 0,
    author: {
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    content:
      "Ces services permettent de trouver les sources des photographies et donc de mieux comprendre les restrictions d’usage des images trouvées ici et là sur Internet. Dans tous les cas, méfiez-vous des images trop « parfaites » : généralement issues de banques d’images, leur utilisation est rarement gratuite !",
    imageUrl: undefined,
    videoUrl: undefined,
    postedAt: "",
    likes: 0,
    shares: 0,
    comments: 0,
  };


  const handleSetActive = (index: number) => {
    setActive(index);
    if (index === 0) {
      setPost("Hello World");
      setPost1("");
      setPost2("");
    } else if (index === 1) {
      setPost1(<Publication data={post_example} />);
      setPost("");
      setPost2("");
    } else if (index === 2) {
      setPost2("Hello World2");
      setPost("");
      setPost1("");
    }
  };

    const backgroundImageStyle = {
      backgroundImage: `url("${GreenWave2}")`,
      backgroundSize: "cover",
    };
    
  return (

    <div
      className="flex flex-col"
        style={backgroundImageStyle}>

      <section className="flex flex-wrap xl:flex-1">
        <div className="">
          <div className="fixed">
            <SideBarStat />
          </div>
        </div>
        
        <div className="w-full mt-2 md:ml-52 xl:ml-auto xl:mb-3">
    <div className="xl:w-5/12 xl:ml-auto 2xl:w-5/12 ">
      <div className="xl:ml-28 2xl:ml-32">
      <SearchBar />
    </div>
    </div>
</div>
        <div className="min mx-auto overflow-hidden pt-28 md:max-w-xl md:ml-60 xl:ml-42 2xl:max-w-2xl 2xl:ml-64">
          <div className="">
          <img
              src="https://randomuser.me/api/portraits/men/4.jpg"
              alt="Profile Picture"
              width={160}
              height={160}
              className="border-2 border-white rounded-full relative left-2 bottom-24"
              />
            <div className="relative bottom-24">
              <button className="absolute md:bottom-22 lg:bottom-22 right-0 text-xl bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg mr-5">
                Follow me
              </button>
              <h2 className="text-2xl font-bold text-green-800 ml-7">
                {data.author.name}
              </h2>
              <p className="text-xl text-gray-500 ml-7">
                @{data.author.username}
              </p>
              <p className="text-xl text-gray-700 pt-4 ml-5">
                {data.profileDescription}
              </p>
              <p className="text-xl text-gray-700 ml-5 pt-10">
                <FaHome className="inline-block mr-2" />
                {data.address}
              </p>
              <p className="text-xl text-gray-700 ml-5">
                <FaMapMarkerAlt className="inline-block mr-2" />
                {data.country}
              </p>
              <p className="text-lg text-gray-600 pt-8 ml-5 pb-5">
                <span className="font-bold">{data.following}</span>{" "}
                Followings&nbsp;{" "}
                <span className="font-bold">{data.followers}</span> Followers
              </p>
              <p className="text-lg text-gray-700 ml-5">
                Followed by {data.followedBy}
              </p>

              <div className="flex items-center justify-between px-6 bg-green-100">
                <a
                  href="#"
                  className={classNames(
                    "text-lg text-gray-600 hover:text-gray-800 py-4 px-6 block hover:bg-green-200",
                    {
                      "font-bold border-b-2 border-gray-800": active === 0,
                    }
                  )}
                  onClick={() => handleSetActive(0)}
                >
                  Event
                </a>

                <a
                  href="#"
                  className={classNames(
                    "text-lg text-gray-600 hover:text-gray-800 py-4 px-6 block hover:bg-green-200",
                    {
                      "font-bold border-b-2 border-gray-800": active === 1,
                    }
                  )}
                  onClick={() => handleSetActive(1)}
                >
                  Post
                </a>
                <a
                  href="#"
                  className={classNames(
                    "text-lg text-gray-600 hover:text-gray-800 py-4 px-6 block hover:bg-green-200",
                    {
                      "font-bold border-b-2 border-gray-800": active === 2,
                    }
                  )}
                  onClick={() => handleSetActive(2)}
                >
                  Community
                </a>
              </div>
              <div>{post}</div>
              <div>{post1}</div>
              <div>{post2}</div>
            </div>
          </div>
        </div>
        <div className="ml-4 md:ml-60 xl:w-4/12 xl:ml-auto 2xl:w">
          <div className="w-full">
            <GalleryCard />
          </div>
          <div className="w-full pt-4">
            <Followings suggestions={people}/>
          </div>
          </div>
    </section>
</div>




    // <div 
    //   className="flex flex-col lg:flex-row md:gap-5"
    //   style={backgroun}
    // >

      

    //   <div className="flex flex-col md:flex-row h-full fixed left-0 top-0">
    //     <SideBarStat />
    //   </div>
      
    //   <div className="flex items-center justify-start mt-4">
    //     <div className="flex-grow-0 ml-auto">
    //     <SearchBar />
    //   </div>
      
    //   </div>
    //   <div className="md:ml-20 lg:max-w-4xl lg:ml-1 mt-4 md:w-2/2">
    //     <div className="md:max-w-2xl  min-h-screen rounded-md overflow-hidden">
    //       <div className="h-full">
    //         <div className="flex justify-center h-36 rounded-md bg-green-700"></div>
          //   <img
          //     src="https://randomuser.me/api/portraits/men/4.jpg"
          //     alt="Profile Picture"
          //     width={160}
          //     height={160}
          //     className="border-2 border-white rounded-full relative left-2 bottom-24"
          //     />
          //   <div className="relative bottom-24">
          //     <button className="absolute md:bottom-22 lg:bottom-22 right-0 text-xl bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg mr-5">
          //       Follow me
          //     </button>
          //     <h2 className="text-2xl font-bold text-green-800 ml-7">
          //       {data.author.name}
          //     </h2>
          //     <p className="text-xl text-gray-500 ml-7">
          //       @{data.author.username}
          //     </p>
          //     <p className="text-xl text-gray-700 pt-4 ml-5">
          //       {data.profileDescription}
          //     </p>
          //     <p className="text-xl text-gray-700 ml-5 pt-10">
          //       <FaHome className="inline-block mr-2" />
          //       {data.address}
          //     </p>
          //     <p className="text-xl text-gray-700 ml-5">
          //       <FaMapMarkerAlt className="inline-block mr-2" />
          //       {data.country}
          //     </p>
          //     <p className="text-lg text-gray-600 pt-8 ml-5 pb-5">
          //       <span className="font-bold">{data.following}</span>{" "}
          //       Followings&nbsp;{" "}
          //       <span className="font-bold">{data.followers}</span> Followers
          //     </p>
          //     <p className="text-lg text-gray-700 ml-5">
          //       Followed by {data.followedBy}
          //     </p>

          //     <div className="flex items-center justify-between px-6 bg-green-100">
          //       <a
          //         href="#"
          //         className={classNames(
          //           "text-lg text-gray-600 hover:text-gray-800 py-4 px-6 block hover:bg-green-200",
          //           {
          //             "font-bold border-b-2 border-gray-800": active === 0,
          //           }
          //         )}
          //         onClick={() => handleSetActive(0)}
          //       >
          //         Event
          //       </a>

          //       <a
          //         href="#"
          //         className={classNames(
          //           "text-lg text-gray-600 hover:text-gray-800 py-4 px-6 block hover:bg-green-200",
          //           {
          //             "font-bold border-b-2 border-gray-800": active === 1,
          //           }
          //         )}
          //         onClick={() => handleSetActive(1)}
          //       >
          //         Post
          //       </a>
          //       <a
          //         href="#"
          //         className={classNames(
          //           "text-lg text-gray-600 hover:text-gray-800 py-4 px-6 block hover:bg-green-200",
          //           {
          //             "font-bold border-b-2 border-gray-800": active === 2,
          //           }
          //         )}
          //         onClick={() => handleSetActive(2)}
          //       >
          //         Community
          //       </a>
          //     </div>
          //     <div>{post}</div>
          //     <div>{post1}</div>
          //     <div>{post2}</div>
          //   </div>
          // </div>
    //     </div>
    //   </div>
    //   <div className="w-full md:w-auto pt-4">
    //     <div className="">
          
    //       <GalleryCard />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
