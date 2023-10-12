import React, { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { S_BUTTON } from "../Components/Buttons/SButton";
import ProfileCard from "../Components/Cards/ProfileCard";
import FFeed from "../Components/Followings/FollowFeed";
import GreenWave2 from "../images/GreenWave2.jpg";

const Prof = () => {
  const [active, setActive] = useState(0);
  const { u_tag } = useParams();
  const [profile_tag, setPTag] = useState(u_tag || "");
  const [post, setPost] = useState("");
  const [post1, setPost1] = useState<null | React.ReactNode>(null);
  const [post2, setPost2] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [rerender_feed_VCard, setRerenderFeedVCard] = useState(0);
  const [activeButton, setActiveButton] = useState("Followers");
  let location = useLocation();
  const [uu_tag, setUUTag] = useState(location.pathname.split("/")[2]);

  const backgroundImageStyle = {
    backgroundImage: `url("${GreenWave2}")`,
    backgroundSize: "cover",
  };

  useEffect(() => {
    console.log(location.pathname.split("/"));

    setUUTag(location.pathname.split("/")[2]);
    setRerenderFeedVCard(Math.random());
  }, [location]);

  return (
    <div className=" flex flex-col md:flex-row " style={backgroundImageStyle}>
      <div className=" flex flex-col md:flex-[0_1_300px] gap-4  p-4">
        <Toaster position="top-right" reverseOrder={false} />
        <ProfileCard editable={false} />
      </div>
      <div className=" flex-1 flex flex-col p-3 ">
        <div className=" flex items-end gap-8 flex-[0_1_5%] pl-2 ">
          <S_BUTTON
            text="Followers"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <S_BUTTON
            text="Follows"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
        <div className=" flex-[0_1_95%] md:w-[50%] rounded-lg ">
          {activeButton == "Followers" && (
            <FFeed user_tag={uu_tag} type="Followers" />
          )}
          {activeButton == "Follows" && (
            <FFeed user_tag={uu_tag} type="Follows" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Prof;
