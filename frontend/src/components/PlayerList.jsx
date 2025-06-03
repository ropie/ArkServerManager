import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BACKEND_BASEURL = "https://api.ropie.dev";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="w-1/7 p-2 align-left">
      <Link to={`/view/${props.record._id}`}> {props.record.implantid}</Link>
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
      {props.record.charactername}
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
      {props.record.charLevel}
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
      <Link to={`/tribe/${props.record.tribe}`}>{props.record.tribe}</Link>
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
      <div className={online(props.record.offline?.toString())}>
        <span className="font-sans text-current leading-none my-0.5 mx-1.5">
          {Status(props.record.offline?.toString())}
        </span>
      </div>
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
      {ConvertSectoDay(props.record.playTime)}
    </td>
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

function ConvertSectoDay(n) {
  var day = parseInt(n / (24 * 3600));

  n = n % (24 * 3600);
  var hour = parseInt(n / 3600);

  n %= 3600;
  var minutes = n / 60;

  n %= 60;
  var seconds = n;

  var playTimeConverted =
    day +
    " " +
    "days " +
    hour +
    " " +
    "hours " +
    minutes.toFixed() +
    " " +
    "minutes ";

  return playTimeConverted;
}

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  /*/ This method fetches the records from the database.  Need to test changes here for pagination.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${BACKEND_BASEURL}/record/players`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        console.log("Womp Womp on Get Records");
        return;
      }
      const records = await response.json();
      setRecords(records);
      console.log(records);
    }
    getRecords();
    return;
  }, [records.length]); */

  useEffect (() => {
    fetch(`${BACKEND_BASEURL}/record/players`)
    .then((response) => response.json())
    .then(({totalPlayers, totalPages}) => {
      console.log(totalPages, totalPlayers)
    })
  }, [])

  

  // This method will map out the records on the table
  function playerList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <>
      
    </>
  );
}
