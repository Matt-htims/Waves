import React, { useState } from 'react';

//Import styles
import './styles/app.scss';

//Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

//Import data
import data from './data';

function App() {
	//State
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);

	return (
		<div className={`App ${libraryStatus ? 'library-active' : ''}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				songs={songs}
			/>
			<Library
				libraryStatus={libraryStatus}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
				currentSong={currentSong}
			/>
		</div>
	);
}

export default App;
