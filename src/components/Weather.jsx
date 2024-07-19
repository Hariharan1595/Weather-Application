import React, { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";

import { FaLocationDot, FaMagnifyingGlass, FaWind } from "react-icons/fa6";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import loadingImg from "../assets/images/loading.gif";
const Weather = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const api = "eccb9a178b4a7a97c7e5143e106b6321";
  const currentDate = new Date();

  useEffect(() => {
    const defualtWeather = async () => {
      setLoading(true)
      const defaultLocation = "Chennai";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api}`;
      const res = await fetch(url);
      const defaultData = await res.json();

      setWeather(defaultData);
      setLoading(false);
    };
    defualtWeather();
  }, []);

  const search = async () => {
    setLoading(true);
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.cod !== 200) {
        setWeather({ notFound: true });
      } else {
        setWeather(data);
        setLocation("");
        setLoading(false);
      }
    }
  };

  const handelChange = (e) => {
    setLocation(e.target.value);
  };
  const keyEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  const weatherImages = {
    Clear: sunny,
    Rain: rainy,
    Clouds: cloudy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };
  const daysOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "sat"];
  const daysOfMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const week = daysOfWeeks[currentDate.getDay()];
  const month = daysOfMonths[currentDate.getMonth()];
  const day = currentDate.getDate();
  const fullDate = `${week},${day} ${month}`;
  const backgroundColors = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Cloudy: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };
  const weatherImage = weather.main
    ? weatherImages[weather.weather[0].main]
    : null;

  const backgroundImage = weather.weather
    ? backgroundColors[weather.weather[0].main]
    : "linear-gradient(to right, #57d6d4, #71eeec)";
  return (
    <div
      className="w-full h-[100vh] flex items-center justify-center relative "
      style={{ backgroundImage }}
    >
      <div
        className="w-[30rem] h-[40rem] rounded-xl max-sm:w-[80%] max-sm:h-[80vh] shadow flex flex-col  items-center p-5 relative"
        style={{ backgroundImage }}
      >
        <div>
          <div className="flex riun items-center gap-2 text-[1.6rem] tracking-widest font-semibold text-[#484569]">
            <FaLocationDot />
            <h3>{weather.name}</h3>
          </div>
          <div className="flex items-center gap-x-3 my-4 relative ">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handelChange}
              onKeyDown={keyEnter}
              className="w-[20rem] max-sm:w-[100%] h-[2.5rem] bg-transparent border-[0.2rem] border-[#676394] rounded-[3rem] outline-none p-5 text-[1.2rem] text-[#484569] placeholder:text-[1.2rem] placeholder:text-[#676394] placeholder:tracking-wide placeholder:focus:text-transparent"
            />
            <FaMagnifyingGlass
              className="text-[1.5rem] absolute right-[1.5rem] text-[#2f2e57] cursor-pointer"
              onClick={() => search()}
            />
          </div>
        </div>
        {loading ? (
          <img className="w-10 mt-10" src={loadingImg} />
        ) : weather.notFound ? (
          <div className="text-2xl mt-10 font-semibold text-[#2f2e57]">
            Not Found 😑
          </div>
        ) : (
          <>
            <div>
              <img
                src={weatherImage}
                alt="sunny"
                className="-mt-1 "
                width={180}
              />
              <p className="absolute font-semibold top-[46%] left-[50%] translate-x-[-50%] text-[2rem] text-[#484569]">
                {weather.main ? weather.weather[0].main : null}
              </p>
              <p className="absolute font-semibold  top-[53%] left-[50%] translate-x-[-50%] text-[5rem] gradient-2 max-sm:text-[4rem] max-sm:top-[58%]">
                {weather.main ? `${Math.round(weather.main.temp)}°` : null}
              </p>
              <p className="absolute font-semibold top-[73%] left-[50%] translate-x-[-50%] text-[#433c88]">
                {fullDate}
              </p>
            </div>
            <div className="flex gap-x-10 p-3 w-full absolute bottom-1 text-xl text-[#484569]">
              <div className="flex flex-1 flex-col gap-y-3 justify-center items-center gradient-3 p-1 rounded-md">
                <p>Humidity</p>
                <WiHumidity />
                <p>{weather.main ? weather.main.humidity : null}%</p>
              </div>
              <div className="flex flex-1 gap-y-3 justify-center items-center flex-col gradient-3 p-1 rounded-md ">
                <p>Wind Speed</p>
                <FaWind />

                <p>{weather.main ? weather.wind.speed : null}km/h</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
