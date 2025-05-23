import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      {props.record.tribe}
    </td>
    <td className="w-1/7 p-2 align-left [&:has([role=checkbox])]:pr-0">
      {props.record.offline}
    </td>
  </tr>
);

function Status(d) {
  var stringValue = d.toString();
  console.log(d);
  let result = stringValue.includes("true");
  if ((d = true)) {
    return "Offline";
  } else {
    return "Online";
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

export default function TribeMemberList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords(tribe) {
      const response = await fetch(
        `https://arkservermanagerbackend.onrender.com/record/${tribe}`
      );
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
      <h3 className="text-lg font-bold p-4">Tribe Members</h3>
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
