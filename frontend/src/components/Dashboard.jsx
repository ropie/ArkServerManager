import { useState } from "react";

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full px-5">
        <h1 className="text-xl text-zinc-800 font-medium">
          This is the Dashboard page. Server stats and other stuff will go here.
          For now, only links that work are Dashboard and Characters. Links for
          the other stuff do not work yet. But they will soon. :-) Working on
          pagination for the Player List which is why only 25 players are
          showing.
        </h1>

        <img src="https://imageio.forbes.com/specials-images/imageserve/682dfe3765124eff8366ef25/Skibidi-Toilet-is-set-to-become-a-Michael-Bay-film/0x0.jpg?format=jpg&width=960" />
      </div>
    </>
  );
}

export default Dashboard;
