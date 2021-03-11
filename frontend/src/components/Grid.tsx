import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

type GridType = {
    token: string,
    playVideo: (url: string) => void,
}

// The grid of thumbnails on the main page. Each card
// should contain a link to a video as well ass some info
// about the video.
const Grid = ({ token, playVideo }: GridType) => {

    const [images, setImages] = useState<Array<string>>([]);

    useEffect(() => {
        if(!token) {
            return;
        }
        fetch('http://localhost:3001/getThumbnails', {
            method: 'GET',
            headers: {
                token: token 
            }
        })
        .then(res => res.json())
        .then(images => setImages(images))
    }, [token])

    return (
        <div className="container" >
            <div className="row">
                {
                    images.map((image) => (
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <VideoCard
                                url={image}
                                playVideo={playVideo}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Grid
