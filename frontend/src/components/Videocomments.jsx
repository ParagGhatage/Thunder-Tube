import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteComment from './DeleteComment';

const Videocomments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://thunder-tube-backend.vercel.app/api/v1/users/getcomments/${videoId}`);
            setComments(response.data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Video Comments</h1>
            <ul className="divide-y divide-gray-200">
                {comments.map(comment => (
                    <li key={comment._id} className="py-4">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <img src={comment.userAvatar} alt={comment.username} className="h-10 w-10 rounded-full" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-800">{comment.content}</p>
                                    {/* Conditionally render delete button */}
                                    <DeleteComment commentId={comment._id} />
                                </div>
                                <p className="text-sm text-gray-500">{comment.username}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Videocomments;
