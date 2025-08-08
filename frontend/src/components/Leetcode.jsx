import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cpp from "../assets/C++.png";
import MySQL from "../assets/MySQL.png";
import JavaSript from "../assets/JavaScript.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiRanking } from "react-icons/pi";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import Loader from "../helpers/Loader";

const Leetcode = () => {
  const [username, setUsername] = useState("");
  const [languageProblemCount, setLanguageProblemCount] = useState([]);
  const [name, setname] = useState("");
  const [ranking, setRanking] = useState("");
  const [country, setCountry] = useState("");
  const [problems, setProblems] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState("");
  const [globalRanking, setGlobalRanking] = useState("");
  const [badges, setBadges] = useState([]);
  const [attendedContestsCount, setattendedContestsCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/userDetails`,
        { withCredentials: true }
      );
      setUsername(response.data.data.leetcode_username);
      console.log(username);
    };
    getToken();
  });

  useEffect(() => {
    const userInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/leetcode/userDetails/${username}`,
          {},
          { withCredentials: true }
        );
        setLoading(false);
        console.log(response);
        setLanguageProblemCount(response.data.matchedUser.languageProblemCount);
        setname(response.data.matchedUser.profile.realName);
        setRanking(response.data.matchedUser.profile.ranking);
        setCountry(response.data.matchedUser.profile.countryName);
        setProblems(
          response.data.matchedUser.submitStatsGlobal.acSubmissionNum
        );
        setTotalParticipants(
          response.data.userContestRanking.totalParticipants
        );
        setGlobalRanking(response.data.userContestRanking.globalRanking);
        setBadges(response.data.matchedUser.badges);
        setattendedContestsCount(
          response.data.userContestRanking.attendedContestsCount
        );
      } catch (error) {
        console.log("Unable to fetch the user Details", error);
      }
    };
    userInfo();
  }, [username]);

  const percentileRank =
    ((totalParticipants - globalRanking) / totalParticipants) * 100;

  const chartData = {
    labels: ["User", "Rest of Users"],
    datasets: [
      {
        label: "Percentile Rank",
        data: [percentileRank, 100 - percentileRank],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h1 className="font-bold text-4xl">{name}</h1>
            <div>
              <p className="font-medium text-sm mt-1 text-slate-500 flex flex-row items-center gap-1">
                <PiRanking size={17} />
                Ranking:{" "}
                <span className="font-bold text-slate-700">{ranking}</span>
              </p>
              <p className="font-medium text-sm mt-1 text-slate-500 flex flex-row items-center gap-1">
                <MdOutlineLocationOn size={17} />
                <span>{country}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 items-center w-full mt-4">
            <div className="lg:w-[48%] lg:h-[370px] w-full bg-white shadow-lg rounded-lg px-3">
              <h1 className="text-2xl font-semibold my-3 ">
                Language specific Problem count :
              </h1>
              <Doughnut
                data={{
                  labels: languageProblemCount.map(
                    (item, index) => item.languageName
                  ),
                  datasets: [
                    {
                      label: "Count",
                      data: languageProblemCount.map(
                        (item, index) => item.problemsSolved
                      ),
                      backgroundColor: [
                        "rgba(0, 226, 255, 1)",
                        "rgba(0, 255, 0, 1)",
                        "rgba(255, 188, 0, 1)",
                        "rgba(123, 45, 220, 0.75)",
                        "rgba(34, 170, 85, 0.6)"
                      ],
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "50%",
                  layout: {
                    padding: 20,
                  },
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 20,
                        font: {
                          size: 12,
                        },
                      },
                    },
                  },
                }}
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                  margin: "0 auto",
                }}
              />
            </div>
            <div className="lg:w-[48%] lg:h-[370px] w-full bg-white shadow-xl rounded-lg px-4 py-1">
              <h1 className="text-2xl font-semibold my-3 mt-2">
                Difficulty wise solved problems:
              </h1>
                <Bar
                  width={500}
                  height={230}
                  data={{
                    labels: problems.map((item, index) => item.difficulty),
                    datasets: [
                      {
                        label: "Count",
                        data: problems.map((item, index) => item.count),
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
                />
            </div>
          </div>
          <div className="lg:w-[48%] w-full mt-3 h-96 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-2">Contest Ranking</h1>
            <p className="text-sm text-slate-600 font-medium">
              Attended Contest : {" "}
              <span className="font-bold text-slate-800">
                {attendedContestsCount}
              </span>
            </p>
            <p className="text-sm text-slate-600 font-medium mb-2">
              Better than {" "}
              <span className="font-bold text-slate-800">
                {percentileRank.toFixed(2)}%
              </span>
              {" "}of participants.
            </p>
            <div className="w-full p-5">
              <Bar 
                width={500}
                height={250}
                data={chartData} 
                options={chartOptions} 
              />
            </div>
          </div>
          <div className="lg:w-[48%] w-full mt-3 h-64 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-2">Badges</h1>
            <p className="font-medium text-sm text-slate-500 mb-3">
              Total badges :
              <span className="font-bold text-black">{badges.length}</span>
            </p>
            <div className="flex flex-row gap-10 items-center w-full justify-center">
              {badges.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={item.icon} height={100} width={100} alt=""/>
                  <p className="font-medium text-sm pl-2">{item.hoverText}</p>
                  <p className="text-gray-400 text-xs font-medium">
                    Id: {item.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leetcode;
