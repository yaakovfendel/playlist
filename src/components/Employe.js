import { useState } from "react";
import Sidebaaremployes from "./Sidebaaremployes";
import axios from "axios";
import BasicTable from "./BasicTable";
import "./Employe.css";
import BasicTable2 from "./BasicTable2";
import BASE_URL from "../jeneral";

export default function Employe() {
  const [full_detailes, setFull_detailes] = useState({
    firstName: "",
    lastName: "",
    id: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFull_detailes({
      ...full_detailes,
      [evt.target.name]: value,
    });
  }
  const headers = {
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
    },
  };
  const [shifts, setShifts] = useState([]);
  const [totalTime, setTime] = useState([0, 0, 0]);
  const [flag, setFlag] = useState(false);

  // const today = new Date();
  // const date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // let time_of_the_day =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // const alphaExp = /^[a-z\u0590-\u05fe]+$/i;

  const get_employe_by_id = async (e) => {
    if (full_detailes.id) {
      const time = new Date().getTime();
      const action = e;
      const res = await axios.post(
        `https://playlist-yaakov.herokuapp.com/emploey/panchtime/${full_detailes.id}/${action}/${time}`,
        full_detailes,
        headers
      );
      const data = await res.data;
      if (action === "exit") {
        setShifts(data);
        setFlag("Shifts");
      }
    }
  };
  const get_shifts_by_id = async (e) => {
    if (full_detailes.id) {
      const res = await axios.get(
        `https://playlist-yaakov.herokuapp.com/emploey/panchtime/${full_detailes.id}`,

        headers
      );
      const data = await res.data;
      setShifts(data);
      setFlag("Shifts");
    }
  };
  const shiptstime = async (e) => {
    if (full_detailes.id) {
      const res = await axios.get(
        `https://playlist-yaakov.herokuapp.com/emploey/shiptstime/${full_detailes.id}`,

        headers
      );
      const data = await res.data;
      setTime(data);
      setFlag("Time");
    }
  };
  const shiptsmoney = async (e) => {
    if (full_detailes.id) {
      const res = await axios.get(
        `https://playlist-yaakov.herokuapp.com/emploey/shiptsmoney/${full_detailes.id}`,

        headers
      );
      const data = await res.data;
      setTime(data);
      setFlag("Time");
    }
  };

  function delete_() {
    if (full_detailes.id) {
      fetch(
        `$https://playlist-yaakov.herokuapp.com/emploey/delete/${full_detailes.id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify([full_detailes.id]),
        }
      )
        .then((res) => res.json())
        .then((res) => console.log(res));
      setFlag("false");
    }
  }

  return (
    <div className="Employee">
      <div>
        <Sidebaaremployes
          get_employe_by_id={get_employe_by_id}
          shiptstime={shiptstime}
          delete_={delete_}
          shiptsmoney={shiptsmoney}
          get_shifts_by_id={get_shifts_by_id}
          handleChange={handleChange}
          full_detailes={full_detailes}
        />
      </div>
      <div>
        {flag === "Shifts" && <BasicTable shifts={shifts} />}
        <div className="BasicTable">
          {flag === "Time" && <BasicTable2 totalTime={totalTime} />}
        </div>
      </div>
    </div>
  );
}
