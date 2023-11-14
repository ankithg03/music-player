// DraggableMusicPlayer.tsx
import React, { useRef, useState } from 'react';
import { MusicPlayer } from '../Components/MusicPlayer';


export const DraggableMusicPlayer = ({ playerModelRef }: any) => {
  const [isToggle, setIsToggle] = useState<any>(false)
  const audioRef = useRef<any>(null);


  const handleClick = (e:any) => {
    if (audioRef && audioRef.current && !audioRef.current.contains(e.target)) {
      e.preventDefault();
      console.log('Clicked outside audioRef:', audioRef, e.movementX, e.movementY, audioRef.current);
      if (!isToggle) {
        setIsToggle(!isToggle);
      }
    }
  };

  const style = !isToggle?{height: '100vh', top:'67vh'}: {height:'95vh', top: '5vh'}

  return (
    <div
      className={`w-full block fixed bottom-0 z-100 overflow-y-clip transition-top duration-500 ${isToggle?'top-unset sm:top-0':''}`}
      style={style}
      role='presentation'
      onClick={handleClick}
      // {...drag()}
    >
      <MusicPlayer audioRef={audioRef} setIsToggle={setIsToggle} isToggle={isToggle}/>
    </div>
  );
};

export default DraggableMusicPlayer;
