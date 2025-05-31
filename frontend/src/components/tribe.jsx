import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const BACKEND_BASEURL = "https://api.ropie.dev"


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
      Tribe Rank will go here (Owner, Admin, Member)
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
    <div className={online(props.record.offline?.toString())}>
      <span class="font-sans text-current leading-none my-0.5 mx-1.5">{offlineStatus(props.record.offline?.toString())}</span>
      </div>
    </td>
  </tr>
);

function offlineStatus(d) {
  if ((d === "true")) {
    return "Offline";
  } else {
    return "Online";
  }
}

function online(f) {
  
  if ((f === "true")) {
    return "relative inline-flex w-max items-center border font-sans font-medium rounded-md text-xs p-0.5 shadow-sm bg-red-800 border-red-800 text-red-50";
  } else {
    return "relative inline-flex w-max items-center border font-sans font-medium rounded-md text-xs p-0.5 shadow-sm bg-green-800 border-green-800 text-green-50";
  }
}

export default function TribeMemberList() {
  const [records, setRecords] = useState([]);
  const params = useParams();
  // This method fetches the records from the database.
  useEffect(() => {
    async function getTribe() {
      const response = await fetch(
        `${BACKEND_BASEURL}/record/tribe/${params.tribe}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        console.log(
          `Womp Womp on Get Tribe.  Request that was sent is: ${BACKEND_BASEURL}/record/tribe/${params.tribe}`
        );
        return;
      }
      console.log(
        `Request that was sent is: ${BACKEND_BASEURL}/record/tribe/${params.tribe}`
      );
      const records = await response.json();
      setRecords(records);
    }
    getTribe();
    return;
  }, [records.length, params.tribe, BACKEND_BASEURL]);

  // This method will map out the records on the table
  function tribeMemberList() {
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
      <h3 className="text-lg font-bold p-4">{params.tribe} Members ({records.length})</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Implant ID
                </th>
                <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Character Name
                </th>
                <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Level
                </th>
                <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Rank
                </th>
                <th className="w-1/6 h-12 px-4 text-left align-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {tribeMemberList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
