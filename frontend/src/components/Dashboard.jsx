import { useState } from "react";

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full px-5">
        <h1 className="text-xl text-zinc-800 font-medium">
          This is the Dashboard page. Server stats and other stuff will go here.
          For now, I only have the player list working. Links for the other stuff do not work
          yet. But they will soon. :-)
        </h1>
      </div>
    </>
  );
}

export default Dashboard;
