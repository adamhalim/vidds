import { Link } from 'react-router-dom';
import '../styles/popup.css'

type VideoPlayerType = {
    url: string,
    closeVideo: any
}
/**
 * This component is the video player that is displayed
 * when playing a video on the website.
 * TODO: Make this mobile friendly maybe...
 */
const VideoPlayer = ({ url, closeVideo }: VideoPlayerType) => {

    // I don't want the video to close down if 
    // we call onClick from the actual videoPlayer.
    // This is very a very hack:y solution...
    // There must be a better way to do thiis.
    let shutdown = true;
    function closePopup(divName: string) {
        console.log(divName);
        if (shutdown && divName !== 'videoplayer') {
            closeVideo();
        } else if (divName === 'videoplayer') {
            shutdown = false;
        } else {
            shutdown = true;
        }
    }

    return (
        <div
            className='videoplayer-background'
            onDoubleClick={
                () => closePopup('videoplayer-background')
            }
        >
            <Link to='/'
                onClick={() => closePopup('x')}
            >
            x</Link>
            <div
                className='videoplayer'
                onDoubleClick={
                    () => closePopup('videoplayer')
                }
            >
                <video controls autoPlay muted>
                    <source src={url} />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

VideoPlayer.defaultProps = {
    url: 'https://halim.se/files/video.mp4'
}

export default VideoPlayer