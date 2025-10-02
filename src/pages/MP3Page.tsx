import { useEffect, useRef, useState } from "react";
import {
  IoAddCircleOutline,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPause,
  IoPlay,
  IoTrash,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

type Song = {
  id: number;
  title: string;

  path: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Sweather Weather",
    path: "song1.mp3",
  },
  {
    id: 2,
    title: "Coming Right Back",
    path: "song2.mp3",
  },
  {
    id: 3,
    title: "Work Out",
    path: "song3.mp3",
  },
];

export default function MP3Page() {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const musicPlayer = useRef<HTMLAudioElement>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (musicPlayer.current) {
      musicPlayer.current.currentTime = newTime;
    }
  };

  const handleNextSong = () => {
    if (!activeSong) return;
    const currentIndex = songs.findIndex((song) => song.id === activeSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setActiveSong(songs[nextIndex]);
  };

  const handlePreviousSong = () => {
    if (!activeSong) return;
    const currentIndex = songs.findIndex((song) => song.id === activeSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setActiveSong(songs[previousIndex]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const updateTime = () =>
    setCurrentTime(musicPlayer.current?.currentTime || 0);
  const updateDuration = () => setDuration(musicPlayer.current?.duration || 0);

  useEffect(() => {
    if (isPlaying) {
      musicPlayer.current?.play();
    } else {
      musicPlayer.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (activeSong && musicPlayer.current) {
      musicPlayer.current.play();
      setIsPlaying(true);
    }
  }, [activeSong]);

  useEffect(() => {
    if (musicPlayer.current) {
      musicPlayer.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-neutral-300 font-sans">
      <header className="flex justify-between items-center p-4 border-b border-neutral-800 flex-shrink-0">
        <h1 className="text-xl font-bold">DASC UABCS - MP3 Player</h1>
        <button className="text-neutral-400 hover:text-white transition-colors">
          <IoAddCircleOutline size={32} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto">
        <ul>
          {songs.map((song) => {
            const isActive = song.id === activeSong?.id;
            return (
              <SongItem
                key={song.id}
                song={song}
                isActive={isActive}
                setActiveSong={setActiveSong}
              />
            );
          })}
        </ul>
      </main>

      <footer className="bg-neutral-800/50 p-4 flex flex-col gap-2 flex-shrink-0">
        <div className="text-center text-sm font-semibold tracking-wide">
          {activeSong?.title}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">
            {formatTime(currentTime)}
          </span>
          <div className="w-full relative">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleTimeChange}
              disabled={!activeSong}
              className="w-full h-1.5 bg-neutral-600 rounded-full appearance-none cursor-pointer accent-orange-500"
              style={{
                background:
                  duration > 0
                    ? `linear-gradient(to right, #f97316 0%, #f97316 ${
                        (currentTime / duration) * 100
                      }%, #525252 ${
                        (currentTime / duration) * 100
                      }%, #525252 100%)`
                    : "#525252",
              }}
            />
          </div>
          <span className="text-xs text-neutral-400">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="w-10"></div>
          <div className="flex items-center gap-6">
            <button
              onClick={handlePreviousSong}
              disabled={!activeSong}
              className="text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <IoPlaySkipBack size={24} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!activeSong}
              className="text-white bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isPlaying ? <IoPause size={32} /> : <IoPlay size={32} />}
            </button>
            <button
              onClick={handleNextSong}
              disabled={!activeSong}
              className="text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <IoPlaySkipForward size={24} />
            </button>
          </div>
          <div className="w-10 flex justify-end">
            <div className="flex items-center gap-2">
              <button
                className="text-neutral-400 hover:text-white transition-colors"
                onClick={() => {
                  setVolume(volume === 0 ? 0.5 : 0);
                }}
              >
                {volume === 0 ? (
                  <IoVolumeMute size={24} />
                ) : (
                  <IoVolumeMedium size={24} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${
                    volume * 100
                  }%, #525252 ${volume * 100}%, #525252 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </footer>
      <audio
        ref={musicPlayer}
        src={`/music/${activeSong?.path}`}
        className="hidden"
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateDuration}
        onEnded={handleNextSong}
      >
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

type SongItemProps = {
  song: Song;
  isActive: boolean;
  setActiveSong: (song: Song) => void;
};

function SongItem({ song, isActive, setActiveSong }: SongItemProps) {
  return (
    <li
      onClick={() => setActiveSong(song)}
      className={`flex items-center p-3 cursor-pointer border-b border-neutral-800 transition-colors ${
        isActive ? "bg-neutral-800 text-orange-500" : "hover:bg-neutral-800"
      }`}
    >
      <div className="flex items-center w-8">
        <div
          className={`w-1 h-5 ${
            isActive ? "bg-orange-500" : "bg-transparent"
          } mr-3`}
        ></div>
        {isActive ? (
          <IoPause size={20} />
        ) : (
          <IoPlay size={20} className="text-neutral-400" />
        )}
      </div>

      <span className="flex-1 ml-2 truncate">{song.title}</span>

      <button className="ml-4 text-neutral-500 hover:text-white transition-colors">
        <IoTrash size={20} />
      </button>
    </li>
  );
}
