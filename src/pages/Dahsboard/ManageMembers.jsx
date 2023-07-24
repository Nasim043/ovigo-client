import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const ManageMembers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const params = useParams();

    useEffect(() => {
        fetch(`https://ovigo-server-wheat.vercel.app/community/users/${params?.id}`)
            .then(res => res.json())
            .then((data) => {
                setUsers(data);
            })
    }, [params?.id]);

    const handleRemove = (userEmail) => {
        const deleteInfo = {
            communityId: params.id,
            userEmail: userEmail,
        }

        fetch('https://ovigo-server-wheat.vercel.app/community/removeJoined', {
            method: 'PATCH',
            body: JSON.stringify(deleteInfo),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resData) => {
                // console.log(resData);

                // get updated user information
                fetch(`https://ovigo-server-wheat.vercel.app/community/users/${params?.id}`)
                    .then(res => res.json())
                    .then((data) => {
                        setUsers(data);
                    })

                if (resData.matchedCount) {
                    toast.success('Removed from the community', {
                        closeOnClick: true,
                    })
                }
            })
    }

    return (
        <div className="my-container">
            <h3 className="text-mysecondary text-center text-2xl md:text-3xl font-semibold mb-4 py-4 md:py-10 md:mb-10 bg-base-200">Manage users</h3>
            <div className="overflow-x-auto md:ml-4 mb-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((singleUser, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={singleUser.image} alt={singleUser.name} />
                                        </div>
                                    </div>
                                </td>
                                <td>{singleUser.name}</td>
                                <td>{singleUser.email}</td>
                                <td>
                                    <button onClick={() => handleRemove(singleUser.email)} disabled={singleUser.email === user?.email ? 'disabled' : ''} className="btn btn-error normal-case btn-sm mb-2 mr-2 text-white">remove</button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMembers;