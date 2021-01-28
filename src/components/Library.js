import React from 'react';

import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, setSongs, currentSong, libraryStatus }) => {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map(song => (
					<LibrarySong
						song={song}
						songs={songs}
						currentSong={currentSong}
						setCurrentSong={setCurrentSong}
						key={song.id}
						setSongs={setSongs}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
