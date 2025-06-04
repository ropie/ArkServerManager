import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const BACKEND_BASEURL = "https://api.ropie.dev";

const PlayerRecord = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="w-auto pr-10 pl-1 pb-1 pb-1 align-left">
      <Link to={`/view/${props.record._id}`}> {props.record.steamxboxpsn}</Link>
    </td>
    <td className="w-auto pr-10 pl-1 pb-1 pb-1 align-left">
      {props.record.charactername}
    </td>
    <td className="w-auto pr-10 pl-1 pb-1 pb-1 align-left">
      {props.record.tokens}
    </td>
    <td className="w-auto pr-10 pl-1 pb-1 pb-1 align-left">
      <Link to={`/tribe/${props.record.tribe}`}>{props.record.tribe}</Link>
    </td>
    <td className="w-auto pr-10 pl-1 pb-1 pb-1 align-left">
      <div className={online(props.record.offline?.toString())}>
        <span className="font-sans text-current leading-none my-0.25 mx-1.1">
          {Status(props.record.offline?.toString())}
        </span>
      </div>
    </td>
    <td className="w-auto pr-10 pl-1 pb-1 pb-1 align-left">Something</td>
  </tr>
);

function Status(d) {
  if (d === "true") {
    return "Offline";
  } else {
    return "Online";
  }
}

function online(f) {
  if (f === "true") {
    return "relative inline-flex w-max items-center border font-sans font-medium rounded-md text-xs p-0.5 shadow-sm bg-red-800 border-red-800 text-red-50";
  } else {
    return "relative inline-flex w-max items-center border font-sans font-medium rounded-md text-xs p-0.5 shadow-sm bg-green-800 border-green-800 text-green-50";
  }
}

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [totalpages, settotalpages] = useState();
  const [totalplayers, settotalplayers] = useState();
  const [pageNumber, setpageNumber] = useState(0);

  const pages = new Array(totalpages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`${BACKEND_BASEURL}/record/players?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPlayers, totalPages, results }) => {
        setPlayers(results);
        settotalpages(totalPages);
        settotalplayers(totalPlayers);
        console.log(`${BACKEND_BASEURL}/record/players?page=${pageNumber + 1}`);
      });
  }, [pageNumber]);

  function playerList() {
    return players.map((player) => {
      return <PlayerRecord record={player} key={player._id} />;
    });
  }

  const goToPrevious = () => {
    setpageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNext = () => {
    setpageNumber(Math.min(totalpages -1  , pageNumber + 1));
    console.log(pageNumber);
  };

  return (
    <>
      <div className="w-auto px-5 pb-4">
        <div className="relative w-auto overflow-auto">
          <table className="table-auto border-collapse border border-zinc-400">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="w-auto pr-10 pl-1 text-left align-left font-medium text-muted-foreground">
                  Steam/XBox/PSN Name
                </th>
                <th className="w-auto pr-10 pl-1 text-left align-left font-medium text-muted-foreground">
                  Character Name
                </th>
                <th className="w-auto pr-10 pl-1 text-left align-left font-medium text-muted-foreground">
                  Tokens
                </th>
                <th className="w-auto pr-10 pl-1 text-left align-left font-medium text-muted-foreground">
                  Something
                </th>
                <th className="w-auto pr-10 pl-1 text-left align-left font-medium text-muted-foreground">
                  Something
                </th>
                <th className="w-auto pr-10 pl-1 text-left align-left font-medium text-muted-foreground">
                  Something
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">{playerList()}</tbody>
          </table>
        </div>

        {/*Pagination imported from the web.  Need to make it work... Maybe*/}
        <div className="flex items-center justify-between border-t border-gray-200 bg-zinc px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={goToPrevious}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-zinc px-4 py-2 text-sm font-medium text-gray-700 hover:bg-zinc-200"
            >
              Previous
            </button>
            <button
              onClick={goToNext}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-zinc px-4 py-2 text-sm font-medium text-gray-700 hover:bg-zinc-200"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{pageNumber * 25 + 1}</span> to{" "}
                <span className="font-medium">{ Math.min(totalplayers, (pageNumber + 1) * 25) } </span> of{" "}
                <span className="font-medium">{totalplayers}</span> results
              </p>
            </div>
            <div>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-xs"
              >
                <button
                  onClick={goToPrevious}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-zinc-200 focus:z-20 focus:outline-offset-0"
                >
                  <ChevronLeftIcon aria-hidden="true" className="size-5" />
                </button>
                {pages.map((pageIndex) => (
                  <button
                    onClick={() => setpageNumber(pageIndex)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-zinc px-4 py-2 text-sm font-medium text-gray-700 hover:bg-zinc-200"
                  >
                    {pageIndex + 1}
                  </button>
                ))}
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                <button
                  onClick={goToNext}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <ChevronRightIcon aria-hidden="true" className="size-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
