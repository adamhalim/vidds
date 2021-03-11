import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/video-elem.css'

type VideoCardType = {
    url: string,
    title: string,
    uploadDate: string,
    playVideo: any,
}

const VideoCard = ({ url, title, uploadDate, playVideo }: VideoCardType) => {

    const [thumbnail, setThumbnail] = useState("");

    return (
        <div className='video-elem'>
            <img className='video-thumbnail'
                src={url}
                onClick={() => playVideo(url)}
            />
            <div className='video-block'>
                <p>{title}</p>
                <p>{uploadDate}</p>
                <a href={url} target="_blank">{url}</a>
                <div className='btn-video'>
                    <Link to="/">Delete</Link> | <Link to="/">Settings</Link>
                </div>
            </div>
        </div>
    )
}

VideoCard.defaultProps = {
    title: "Video Title",
    uploadDate: "Uploaded: Today"
}

export default VideoCard