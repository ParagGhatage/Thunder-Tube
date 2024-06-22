import React, { useState } from 'react';
import Channel from './Channel';
import Subscribers from './Subscribers';
import { Button } from './ui/button';
import Togglesubscribe from './Togglesubscribe';

const Chanprofile = ({ channelId, cookies }) => {
    const [showChannelDetails, setShowChannelDetails] = useState(false);
    const [showMoreFromChannel, setShowMoreFromChannel] = useState(false);

    const toggleChannelDetails = () => {
        setShowChannelDetails(!showChannelDetails);
    };

    const toggleMoreFromChannel = () => {
        setShowMoreFromChannel(!showMoreFromChannel);
    };

    return (
        <div className="mt-4">
            <Button onClick={toggleChannelDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Channel
            </Button>
            <br />
            {showChannelDetails && (
                <div className="mt-4">
                    <button onClick={toggleMoreFromChannel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        More from Channel
                    </button>
                    <Togglesubscribe cookies={cookies} channelId={channelId} />
                    <Subscribers channelId={channelId} cookies={cookies} />
                    {showMoreFromChannel && <Channel channel={channelId} cookies={cookies} />}
                </div>
            )}
        </div>
    );
};

export default Chanprofile;
