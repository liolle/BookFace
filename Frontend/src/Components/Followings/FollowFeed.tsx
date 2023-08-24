import React, { useEffect, useState } from "react";
import { Person, ResponseMsg, StatusTypes } from "../../utils/typess";
import { SlUserFollow } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFollow, fetchFollowers, fetchFollows } from "../../utils/library";
// import { Person } from "./people"; // importation de notre type Person


// export interface Person {
//   id:number
//   tag:string,
//   avatar:string
// }

type FFeedType = "Follows" | "Followers"

const FFeed = ({ user_tag, type }: {  user_tag: string, type: FFeedType }) => {

  const [showAll, setShowAll] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [follows, setFollows] = useState<Person[]>([])
  const [followers, setFollowers] = useState<Person[]>([])
  //   const displayedSuggestions = showAll ? persons : persons.slice(0,3);
  const displayedFollow = showAll ? follows : follows.slice(0, 3);
  const displayedFollowers = showAll ? followers : followers.slice(0, 3);
  const [users, setUsers] = useState<Person[]>([])
  let navigate = useNavigate()

  useEffect(() => {

    if (type == "Follows") {
      fetchFollows(user_tag)
        .then(data => {
          setUsers(data.content as Person[])
        })
    }
    else if (type == "Followers") {

      fetchFollowers(user_tag)
        .then(data => {

          setUsers(data.content as Person[])

        })
    }

  }, [reRender, user_tag])


  const truncate = (word: string): string => {
    return word.length > 10 ? word.slice(0, 7) + "..." : word
  }


  return (
    <div className="flex flex-col rounded-md gap-4 p-2 w-full">
      {users.map((person) => (
        <div key={person.id} className="flex items-center mb-4 border-b-2  pb-4 ml-2">
          <img
            src={person.avatar}
            alt="Avatar"
            className="rounded-full w-12 h-12 mr-4"

          />
          <div className=" flex gap-2 justify-between flex-1">

            <div className=" hover:cursor-pointer select-none ">
              <p className=" text-green-600 cursor-pointer select-none hover:text-green-900">{person.tag}</p>
            </div>

            

          </div>
        </div>
      ))}

    </div>
  );
};

export default FFeed;


