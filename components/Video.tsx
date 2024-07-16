import React, { useRef, useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import VideoControls from "./VideoControls";
import * as ScreenOrientation from "expo-screen-orientation";


const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];


const VideoScreen = () => {
  const videoRef = useRef(null);
  const [orientation, setOrientation] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
    //get the tap position on X
      const touchX = event.absoluteX;
      let mid = Dimensions.get("screen").width / 2;

    //if tap position is before the mid point, set video back by 10s
      if (touchX < mid) {
        videoRef.current.getStatusAsync().then((status: { positionMillis: number; }) => {
          const newPosition = Math.max(status.positionMillis - 10000, 0);
          videoRef.current.setPositionAsync(newPosition);
        });
      } 
      //if tap position is before the mid point, set video forward by 10s
      else {
        videoRef.current.getStatusAsync().then((status: { positionMillis: number; durationMillis: number; }) => {
          const newPosition = Math.min(
            status.positionMillis + 10000,
            status.durationMillis
          );
          videoRef.current.setPositionAsync(newPosition);
        });
      }
    });

  const singleTap = Gesture.Tap().onStart((event) => {
    setShowControls(!showControls);
    // Simulate show/hide controls behavior here
  });

  const lessonVideoUrl = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'


  //sets the current time
   const handlePlaybackStatusUpdate = (status: { positionMillis: React.SetStateAction<number>; didJustFinish: any; }) => {
    setCurrentTime(status.positionMillis);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };


  const togglePlaybackSpeed = () => {
    //gets the next playback speed index
    const nextSpeedIndex = playbackSpeedOptions.indexOf(playbackSpeed) + 1;
    if (nextSpeedIndex < playbackSpeedOptions.length) {
      videoRef.current.setRateAsync(playbackSpeedOptions[nextSpeedIndex], true);
      setPlaybackSpeed(playbackSpeedOptions[nextSpeedIndex]);
    }
    //if the last option i.e. 2x speed is applied. then moves to first option 
    else {
      videoRef.current.setRateAsync(playbackSpeedOptions[0], true);
      setPlaybackSpeed(playbackSpeedOptions[0]);
    }
  };

  const toggleMute = () => {
    videoRef.current.setIsMutedAsync(isMuted);
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setIsFullscreen(true);
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsFullscreen(false);
    }
    setOrientation(await ScreenOrientation.getOrientationAsync());
  };


  return (
    <GestureHandlerRootView style={{ flex: 1}}>
          <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
            <Video
              ref={videoRef}
              source={{
                uri: lessonVideoUrl,
              }}
              rate={playbackSpeed}
              isMuted={isMuted}
              shouldPlay={isPlaying}
              resizeMode={ResizeMode.COVER}
            //   onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              style={{ flex: 1 }}
            />
          </GestureDetector>
          {showControls && (
            <VideoControls
              onTogglePlayPause={togglePlayPause}
              onToggleMute={toggleMute}
              onTogglePlaybackSpeed={togglePlaybackSpeed}
              onSeek={(value: string | number) => {
                videoRef.current.setPositionAsync(+value);
                setCurrentTime(+value);
              }}
              onToggleFullscreen={toggleFullscreen}
              duration={600}
              currentTime={currentTime}
              rate={playbackSpeed}
              isMuted={isMuted}
              shouldPlay={isPlaying}
              fullScreenValue={isFullscreen}
            />
      )}
      {/* this section is only displayed when fullscreen is not active */}
      {orientation == 1 && (
        <View>
          {/* Simulate other UI elements here */}
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default VideoScreen;

