import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

const GFG = () => {
  const [username, setUsername] = useState("");
  const [codingScore, setCodingScore] = useState();
  const [problemsSolved, setProblemsSolved] = useState();
  const [languagesUsed, setLanguagesUsed] = useState();
  const [easy, setEasy] = useState();
  const [medium, setMedium] = useState();
  const [hard, setHard] = useState();
  const [basic, setBasic] = useState();
  const [rating, setRating] = useState();
  const [level, setLevel] = useState();
  const [rank, setRank] = useState();
  const [att, setAtt] = useState();

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/userDetails`,
        { withCredentials: true }
      );
      setUsername(response.data.data.gfg_username);
    };
    getUserDetails();
  });

  useEffect(() => {
    const fetchGFGDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gfg/userDetails/varadk2b8e`
        );
        console.log(response);
        setCodingScore(response.data.codingScore);
        setLanguagesUsed(response.data.languageUsed);
        setProblemsSolved(response.data.problemsSolved);
        setEasy(response.data.easy);
        setMedium(response.data.medium);
        setHard(response.data.hard);
        setBasic(response.data.basic);
        setRating(response.data.contestRating);
        setLevel(response.data.contestLevel);
        setRank(response.data.contestRank);
        setAtt(response.data.contestAtt);
      } catch (error) {
        console.log("Error while fetching GFG Data");
      }
    };
    fetchGFGDetails();
  }, [username]);
  return (
    <div>
      <h1 className="font-bold text-4xl">{username}</h1>
      <div className="flex flex-row gap-7 mt-5">
        <div className="shadow-lg rounded-lg px-8 py-5 max-w-[250px] bg-white">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-medium tracking-wide">Coding Score:</p>
            <p className="text-xl font-medium text-slate-600">{codingScore}</p>
          </div>
        </div>
        <div className="shadow-lg rounded-lg px-8 py-5 max-w-[250px] bg-white">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-medium tracking-wide">
              Problems Solved:
            </p>
            <p className="text-xl font-medium text-slate-600">
              {problemsSolved}
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-lg px-8 py-5 max-w-[250px] bg-white">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-medium tracking-wide">Languages Used:</p>
            <p className="text-xl font-medium text-slate-600">
              {languagesUsed}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 items-center w-full mt-4">
        <div className="lg:w-[48%] lg:h-[370px] w-full bg-white shadow-lg rounded-lg px-3">
          <h1 className="text-xl font-bold text-slate-800 p-5 ">
            Problems Solved <span className="text-slate-600">(Level wise)</span>
          </h1>
          <Bar
            width={590}
            height={470}
            data={{
              labels: ["Easy", "Basic", "Medium", "Hard"],
              datasets: [
                {
                  label: ["Easy", "Basic", "Medium", "Hard"],
                  data: [easy, basic, medium, hard],
                  backgroundColor: [
                    "rgba(0, 226, 255, 1)",
                    "rgba(0, 255, 0, 1)",
                    "rgba(255, 188, 0, 1)",
                    "rgba(255, 0, 62, 1)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    generateLabels: (chart) => {
                      const labels = ["Easy", "Basic", "Medium", "Hard"];
                      const colors = [
                        "rgba(0, 226, 255, 1)",
                        "rgba(0, 255, 0, 1)",
                        "rgba(255, 188, 0, 1)",
                        "rgba(255, 0, 62, 1)",
                      ];
                      return labels.map((label, index) => ({
                        text: label,
                        fillStyle: colors[index],
                        hidden: false,
                      }));
                    },
                  },
                },
              },
            }}
          />
        </div>
        <div className="lg:w-[48%] lg:h-[370px] w-full bg-white shadow-lg rounded-lg px-3">
            <h1 className="text-xl font-bold text-slate-800 p-5 ">Contest Data</h1>
            <p>Attended Contests :- {att}</p>
            <p>Global Rank :- {rank}</p>
            <p>Level :- {level}</p>
            <p>Contest Rating :- {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default GFG;
