import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import useGetUserId from "../../hooks/useGetUserId";
import { toast } from "react-toastify";

const Home = () => {
    const [groups, setGroups] = useState([]);
    const { user } = useContext(AuthContext);
    // const userId = useGetUserId();
    // console.log(userId);
    useEffect(() => {
        fetch("http://localhost:5000/community")
            .then(res => res.json())
            .then((data) => {
                setGroups(data);
            })
    }, [user?.email]);

    const handleJoin = (id) => {
        const info = {
            communityId: id,
            userEmail: user.email
        }
        // console.log(info);

        fetch('http://localhost:5000/community/addjoined', {
            method: 'PATCH',
            body: JSON.stringify(info),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resData) => {
                // console.log(resData);
                if (resData.matchedCount) {
                    toast.success('Successfully join', {
                        closeOnClick: true,
                      })
                }
            })
    };
    return (
        <div className='my-container mt-12'>
            <div className="flex flex-col justify-center items-center mb-7">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 inline-block text-transparent bg-clip-text mb-4">Join other communities</h2>
                <p className="text-gray-400 text-base sm:text-lg text-center">Find communities that interest you and connect with other people</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                {groups.map((group) => (
                    <div
                        key={group._id}
                        className="max-w-xs rounded-lg overflow-hidden shadow-md flex flex-col justify-between mb-10"
                    >
                        <div className="flex justify-center items-center">
                            <img
                                src={group.image}
                                alt={group.name}
                                className="h-56 w-60 object-center object-contain"
                            />
                        </div>

                        <div>
                            <div className="p-2">
                                <h3 className="text-lg font-bold text-center">{group.name}</h3>
                                <p className="text-gray-500 text-center">{group.description}</p>
                            </div>

                            <Link onClick={() => handleJoin(group._id)} className="flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 font-semibold text-white py-2 px-4 rounded-b-lg focus:outline-none">
                                Join Community
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;