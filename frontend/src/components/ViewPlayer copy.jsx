import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//const BACKEND_BASEURL = process.env.RENDER_URL;

export default function Record() {
  const [form, setForm] = useState({
    charactername: "",
    tribe: "",
    level: "",
    datefirstjoined: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `https://arkservermanagerbackend.onrender.com/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        console.log("Womp Womp");
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch(
          `https://arkservermanagerbackend.onrender.com/record`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
          }
        );
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(
          `https://arkservermanagerbackend.onrender.com/record/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
          }
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({ charactername: "", tribe: "", charLevel: "" });
      navigate("/");
    }
  }

  /*
//Close the player Data Screen
  async function onSubmit(e) {
   //const person = { ...form };
  
    setForm({ charactername: "", tribe: "", charLevel: "" });       
  navigate("/");
    }
  */

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <div className="w-1/2 border rounded-lg overflow-hidden">
        <div className="relative overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <tbody>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Player Information
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Owner
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  {form.charactername}
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
                  {params.implantid}
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
                  Gender Var
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
                  Recent Server Var
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
                  Time Played VAR
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
                  Date Created Var
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
                  Notes Bool
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
                  BTT SE Bool
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
                  BTT Ab Bool
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  BTT Ext Completed
                </td>
                <td
                  cclassName="p-2 align-left [&:has([role=checkbox])]:pr-0"
                  colSpan={4}
                >
                  BTT Ext Bool
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
                  D_Level
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
                  B_Level
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Manticore
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Ma_lvl
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Monkey
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  M_level
                </td>
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Rockwell
                </td>
                <td cclassName="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  R_Lvl
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0" />
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0" />
                <td className="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  Titan
                </td>
                <td cclassName="p-2 align-left [&:has([role=checkbox])]:pr-0">
                  T_lvl
                </td>
              </tr>
            </tbody>
          </table>
        </div>{" "}
      </div>
    </>
  );
}
