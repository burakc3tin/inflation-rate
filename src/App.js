import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function App() {

  const [country, setCountry] = useState("");
  const [date, setDate] = useState("2016-12");
  const [inflation, setInflation] = useState("");

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {

    setChartData({
      labels: [`${country}`],
      datasets: [
        {
          label: "  ",
          data: [`${inflation}`],
          borderColor: " rgb ( 53 , 162 , 235 ) ",
          backgroundColor: "#b73e3e",
        },
      ],
    });

    setChartOptions({
      responsive: true
    });


    const res = axios.get('https://www.statbureau.org/get-data-json?jsoncallback=?', {
      params: {
        country: `${country}`,
        MonthFormatted: `${date}`,
      }
    });

    res.then(function (response) {
      const val = response.data.filter(function (item) { return item.MonthFormatted === `${date}-01` })
      setInflation(val[0].InflationRateFormatted)

    })


  }, [country, inflation, date])


  return (
    <div style={{ background: '#f7ebbe', marginTop: 0 }}  >

      <div style={{ paddingTop: 10, marginBottom: 10, borderColor: 'brown', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input style={{ borderRadius:10,border:'none',padding:5, marginRight: 20, height: 50 }} type="month" id="start" name="start"
          min="1985-01" max="2018-12" onChange={(e) => setDate(e.target.value)} />
        <br />

        <select style={{borderRadius:10,border:'none',padding:5, height: 57, fontSize: 20, color: 'brown' }} name="" id="" onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country</option>
          <option value="turkey">Turkey</option>
          <option value="united-states">United-States</option>
          <option value="united-kingdom">United-Kingdom</option>
          <option value="belarus">Belarus</option>
          <option value="germany">Germany</option>
          <option value="france">France</option>
          <option value="brazil">Brazil</option>
          <option value="india">India</option>
          <option value="japan">Japan</option>
          <option value="russia">Russia</option>
          <option value="kazakhstan">Kazakhstan</option>
          <option value="greece">Greece</option>
          <option value="canada">Canada</option>


        </select></div>

      <Bar options={chartOptions} data={chartData} />

    </div>
  )
}
