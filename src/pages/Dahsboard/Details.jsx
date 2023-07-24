import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Details = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/posts?communityid=${params?.id}`)
            .then(res => res.json())
            .then((data) => {
                setPosts(data);
            })
    }, [params?.id]);

    console.log(posts);
    return (
        <div className="my-container">
            <div className="hero max-h-fit bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={data.image} className="md:h-96 w-full" />
                    <div>
                        <h1 className="text-5xl font-bold">{data.name}</h1>
                        <p className="py-2 text-2xl italic font-semibold">Creator: {data.creator_name}</p>
                        <p className="py-6">{data.description}</p>
                        <div className="flex">
                            <Link className="btn btn-sm btn-primary me-2 my-button" to={`../addPost/${data._id}`}>Create Post</Link>
                            <Link className="btn btn-sm btn-primary my-button">Manage Members</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-10">
                {
                    posts?.map((post) => <div className="card w-full bg-gray-100 shadow-md mb-4" key={post._id}>
                        <div className="card-body">
                            <h2 className="card-title text-purple-600">{post.title}</h2>
                            <p className='text-base font-semibold italic'>Written by: {post.writer_name}</p>
                            <p className='text-base'>{post.description}</p>
                            <span><Link className="btn btn-sm btn-primary me-2 my-button" to={`../editPost/${post._id}`}>Edit Post</Link></span>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Details;