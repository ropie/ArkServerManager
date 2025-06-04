import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BACKEND_BASEURL = "https://api.ropie.dev";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="w-1/6 p-1 align-left">
      <Link to={`/view/${props.record._id}`}> {props.record.implantid}</Link>
    </td>
    <td className="w-1/6 p-1 align-left">
      {props.record.charactername}
    </td>
    <td className="w-1/6 p-1 align-left">
      {props.record.charLevel}
    </td>
    <td className="w-1/6 p-1 align-left">
      <Link to={`/tribe/${props.record.tribe}`}>{props.record.tribe}</Link>
    </td>
    <td className="w-1/6 p-1 align-left">
      <div className={online(props.record.offline?.toString())}>
        <span className="font-sans text-current leading-none my-0.5 mx-1.5">
          {Status(props.record.offline?.toString())}
        </span>
      </div>
    </td>
    <td className="w-1/6 p-1 align-left">
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

export default function CharacterList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${BACKEND_BASEURL}/record/characters`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        console.log("Womp Womp on Get Records");
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`${BACKEND_BASEURL}/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    console.log(`The URL is ${BACKEND_BASEURL}`);
  }

  // This method will map out the records on the table
  function characterList() {
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
      <div className="w-full px-5 pb-4">
        <h3 className="text-lg font-bold p-2">
          Total character count: {characterList().length}
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="w-1/6 p-1  text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Implant ID
                  </th>
                  <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Character Name
                  </th>
                  <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Level
                  </th>
                  <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Tribe
                  </th>
                  <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                  <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Play Time
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {characterList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
