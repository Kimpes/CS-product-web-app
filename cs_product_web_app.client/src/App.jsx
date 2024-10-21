import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [forecasts, setForecasts] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    populateWeatherData();
    getProduct();
  }, []);

  const contents =
    forecasts === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{" "}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{" "}
          for more details.
        </em>
      </p>
    ) : (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <section>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </section>
      <section>
        <h1>Product</h1>
        {product ? (
          <div>
            <p>Part Number: {product.partNumber}</p>
            <p>Name: {product.name}</p>
            <p>Color: {product.color}</p>
            <p>Size (mm): {product.sizeInMillimeters}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );

  async function populateWeatherData() {
    try {
      const response = await fetch("https://localhost:7291/weatherforecast", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setForecasts(data);
    } catch (error) {
      console.error("Fetching weather data failed:", error);
    }
  }

  async function getProduct() {
    try {
      const response = await fetch("https://localhost:7291/product", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Fetching product data failed:", error);
    }
  }
}

export default App;
