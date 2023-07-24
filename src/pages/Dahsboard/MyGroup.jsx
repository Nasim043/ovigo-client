import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

const MyGroup = () => {
    const [groups, setGroups] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://ovigo-server-wheat.vercel.app/community/${user?.email}`)
            .then(res => res.json())
            .then((data) => {
                setGroups(data);
            })
    }, [user?.email]);

    return (
        <div className='my-container mt-4'>
      <div className="flex flex-col justify-center items-center mb-7">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 inline-block text-transparent bg-clip-text mb-4">My Communities</h2>
        <p className="text-gray-400 text-base sm:text-lg text-center">Manage communities posts and members here</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
        {groups.map((group) => (
          <div
            key={group._id}
            className="max-w-sm rounded overflow-hidden shadow-md flex flex-col justify-between"
          >
            <img
              src={group.image}
              alt={group.name}
              className="w-full"
            />

            <div>
              <div className="p-2">
                <h3 className="text-lg font-bold">{group.name}</h3>
                <p className="text-gray-500">{group.description}</p>
              </div>

              <Link className="flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 font-semibold text-white py-2 px-4 rounded-b-lg focus:outline-none" to={`details/${group._id}`}>
                <FaRegEye className='me-2'></FaRegEye>View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default MyGroup;