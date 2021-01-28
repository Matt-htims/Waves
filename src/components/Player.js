import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, setCurrentSong, isPlaying, setIsPlaying, songs }) => {
	//Ref
	const audioRef = useRef(null);

	//State
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});

	//Event Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const timeUpdateHandler = e => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		//Calculate percentage
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
		setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage });
	};

	const getTime = time => {
		return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
	};

	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const autoPlayHandler = () => {
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	const skipTrackHandler = direction => {
		const currentIndex = songs.findIndex(song => song.id === currentSong.id);
		let newIndex = currentIndex + direction;

		if (newIndex < 0) {
			newIndex = songs.length - 1;
		} else if (newIndex >= songs.length) {
			newIndex = 0;
		}

		setCurrentSong(songs[newIndex]);
	};

	const autoSkipHandler = () => {
		skipTrackHandler(1);
	};

	//Add the styles

	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};

	const linearGradient = {
		background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div style={linearGradient} className="track">
					<input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{getTime(songInfo.duration || 0)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon onClick={() => skipTrackHandler(-1)} className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
				<FontAwesomeIcon onClick={() => skipTrackHandler(1)} className="skip-forward" size="2x" icon={faAngleRight} />
			</div>
			<audio
				onEnded={autoSkipHandler}
				onLoadedData={autoPlayHandler}
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
};

export default Player;
