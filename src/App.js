import React, { useState, useEffect, useMemo } from "react";
import Card from "./components/card";
import axios from "axios";
import "./App.css";

const category = [
  "chemistry",
  "economics",
  "peace",
  "physics",
  "medicine",
  "literature",
];
const year = [...Array(119).keys()].map((i) => (1900 + i).toString());

function App() {
  const [data, setData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("All category");
  const [selectYear, setSelectYear] = useState("All year");

  const getWinnersList = async () => {
    try {
      const { data } = await axios.get(
        "https://api.nobelprize.org/v1/prize.json"
      );

      setData(data.prizes);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);

  useEffect(() => {
    getWinnersList();
  }, []);

  const handleChangeCategory = (e) => {
    setSelectCategory(e.target.value);
  };

  const handleChangeYear = (e) => {
    setSelectYear(e.target.value);
  };

  const getFilteredData = () => {
    let filteredData = data;

    if (selectCategory !== "All category") {
      filteredData = filteredData.filter(
        (item) => item.category === selectCategory
      );
    }

    if (selectYear !== "All year") {
      filteredData = filteredData.filter((item) => item.year === selectYear);
    }

    return filteredData;
  };

  const filteredList = useMemo(getFilteredData, [
    selectCategory,
    selectYear,
    data,
  ]);

  return (
    <main>
      <div className="selector">
        <select onChange={handleChangeCategory}>
          <option>All category</option>
          {category.map((data, i) => (
            <option key={i}>{data}</option>
          ))}
        </select>

        <select style={{ marginLeft: "30px" }} onChange={handleChangeYear}>
          <option>All year</option>
          {year.map((data, i) => (
            <option key={i}>{data}</option>
          ))}
        </select>
      </div>
      <div className="grid-container">
        {filteredList.map(
          (data) =>
            data.laureates &&
            data.laureates.map((item) => (
              <Card
                key={item.id}
                category={data.category}
                year={data.year}
                firstname={item.firstname}
                surname={item.surname}
                motivation={item.motivation}
                share={item.share}
              />
            ))
        )}
      </div>
    </main>
  );
}

export default App;
