import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const image_hosting_token = import.meta.env.VITE_image_upload_token;

const AddCommunity = () => {
    const [communityName, setCommunityName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const formReset = () => {
        setCommunityName('');
        setDescription('');
        setSelectedImage(null);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    const image_url = response.data.display_url;
                    const communityInfo = {
                        image: image_url,
                        name: communityName,
                        creator_name: user?.displayName,
                        creator_email: user?.email,
                        description: description,
                    }

                    fetch('https://ovigo-server-wheat.vercel.app/community', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(communityInfo)
                    })
                        .then(res => res.json())
                        .then((data) => {
                            if (data.insertedId) {
                                formReset();
                                toast.success('Community created successfully', {
                                    closeOnClick: true,
                                })
                                navigate('/dashboard');
                            }
                        })
                }
            })

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4 md:my-10 px-14 py-6 shadow-lg rounded-md">
                <h3 className='text-3xl font-bold text-center mb-3 text-mysecondary'>Create a Community</h3>
                <div className="mb-4">
                    <label htmlFor="communityName" className="block text-gray-700 font-bold mb-2">
                        Community Name
                    </label>
                    <input
                        type="text"
                        id="communityName"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="communityImage">
                        Community Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="communityImage"
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="creatorName" className="block text-gray-700 font-bold mb-2">
                        Creator Name
                    </label>
                    <input
                        type="text"
                        id="creatorName"
                        defaultValue={user?.displayName}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="creatorEmail" className="block text-gray-700 font-bold mb-2">
                        Creator Email
                    </label>
                    <input
                        type="email"
                        id="creatorEmail"
                        defaultValue={user?.email}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea className="textarea border border-gray-300 textarea-md w-full"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
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

export default AddCommunity;