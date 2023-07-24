import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const params = useParams();
    // const data = useLoaderData();
    // console.log(data);


    useEffect(() => {
        fetch(`https://ovigo-server-wheat.vercel.app/posts/${params.id}`)
            .then(res => res.json())
            .then((data) => {
                setTitle(data[0].title);
                setDescription(data[0].description);
            })
    }, [params?.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const postInfo = {
            title: title,
            description: description
        }

        fetch(`https://ovigo-server-wheat.vercel.app/posts/edit/${params?.id}`, {
            method: 'PATCH',
            body: JSON.stringify(postInfo),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resData) => {
                // console.log(resData);
                if (resData.matchedCount) {
                    toast.success('Post updated successfully', {
                        closeOnClick: true,
                      })
                    navigate('/dashboard');
                }
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4 md:my-10 px-14 py-6 shadow-lg rounded-md">
                <h3 className='text-3xl font-bold text-center mb-3 text-mysecondary'>Update a Post</h3>
                <div className="mb-4">
                    <label htmlFor="postTitle" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="postTitle"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="writerName" className="block text-gray-700 font-bold mb-2">
                        Writer Name
                    </label>
                    <input
                        type="text"
                        id="writerName"
                        defaultValue={user?.displayName}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="writerEmail" className="block text-gray-700 font-bold mb-2">
                        Writer Email
                    </label>
                    <input
                        type="email"
                        id="writerEmail"
                        defaultValue={user?.email}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="postdescription" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea className="textarea border border-gray-300 textarea-lg w-full"
                        placeholder="Description"
                        id="postdescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white font-bold py-2 px-4 rounded"
                >
                    Create
                </button>
            </form>
        </>
    );
};

export default EditPost;