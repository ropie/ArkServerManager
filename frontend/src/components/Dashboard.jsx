import { useState } from "react";

function Dashboard() {
  return (
    <>
      <div className="w-full px-5">
        <h1 className="text-xl text-zinc-800 font-medium">
          This is the Dashboard page. Server stats and other stuff will go here.
          For now, only links that work are Dashboard and Characters. Links for
          the other stuff do not work yet. But they will soon. :-){" "}
        </h1>
      </div>
      
      <div className="w-full px-5">
        <h3 className="text-xl text-red-800 font-medium">Updates:</h3>
        <ul className="list-disc list-inside">
          <li>
            6-3: Player page is "working" but still need to work on the backend
            to so it only shows unique players based of EOSID (i.e. so if a
            player has 2 characters, it would only count as 1 player) showing.
          </li>
        </ul>
      </div>

      <div>
        <img src="https://imageio.forbes.com/specials-images/imageserve/682dfe3765124eff8366ef25/Skibidi-Toilet-is-set-to-become-a-Michael-Bay-film/0x0.jpg?format=jpg&width=960" />
      </div>
{/* 
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          class="w-full"
          src="/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>*/}
    </>
  );
}

export default Dashboard;
