import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import 'dotenv/config'

const BACKEND_BASEURL = "https://api.ropie.dev"


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

function offlineStatus(d) {
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

export default function Record() {
  const params = useParams();
  const navigate = useNavigate();
  //Testing changes here.
  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getPlayerInfo() {
      const response = await fetch(`${BACKEND_BASEURL}/record/${params.id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        console.log(
          `Womp Womp on Get Tribe.  Request that was sent is: ${BACKEND_BASEURL}/record/${params.id}`
        );
        return;
      }
      console.log(
        `Did it update? Request that was sent is: ${BACKEND_BASEURL}/record/${params.id}`
      );
      const records = await response.json();
      setRecords(records);
    }
    getPlayerInfo();
    return;
  }, [records.length, params.id, BACKEND_BASEURL]);

  // This following section will display the form that takes the input from the user.
  return (
    <>
      {" "}
      <h3 className="text-lg font-bold p-4">
        Player Information for {records.charactername}{" "}
        <div className={online(records.offline?.toString())}>
          <span className="font-sans text-current leading-none my-0.5 mx-1.5">
            {offlineStatus(records.offline?.toString())}
          </span>
        </div>
      </h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <tbody>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Owner
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  {records.steamxboxpsn}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Implant ID
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.implantid}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Gender
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.gender}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Server
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  Most recent server will go here
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Hours Played
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {ConvertSectoDay(records.playTime)}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Created
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.datefirstjoined}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  All Notes Completed
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.allnotes?.toString().toUpperCase()}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  BTT SE Completed
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.bttse?.toString().toUpperCase()}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  BTT AB Completed
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.bttab?.toString().toUpperCase()}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  BTT Ext Completed
                </td>
                <td
                  className="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  {records.bttext?.toString().toUpperCase()}
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Bosses Completed
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Ascentions Completed
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Dragon
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  {records.bosses}
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Overseer
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  O_Lvl
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Broodmother
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  CHANGE ME
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Manticore
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  CHANGE ME
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Megapithecus
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  M_level
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Rockwell
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  R_Lvl
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0" />
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0" />
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Titan
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  T_lvl
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
