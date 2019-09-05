import React from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import videoConnect from "react-html5video";
import "./Video.css";

const MyVideoPlayer: React.FC = () => {
  return (
    <div className="container video">
      <Video
        loop
        controls={[
          "PlayPause",
          "Seek",
          "Time",
          "Volume",
          "Fullscreen",
          "Captions"
        ]}
        poster="./img/poster.jpg"
        onCanPlayThrough={() => {
          // Do stuff
        }}
      >
        <source src="./img/video/DarkFate.mp4" type="video/mp4" />
        <track
          label="Spanish"
          kind="subtitles"
          srcLang="es"
          src="/img/video/videoSubtitles_es.vtt"
          default
        />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="/img/video/videoSubtitles_en.vtt"
          default
        />
        <track label="German" kind="subtitles" srcLang="ge" src="" default />
      </Video>
    </div>
  );
};

export default videoConnect(MyVideoPlayer);
