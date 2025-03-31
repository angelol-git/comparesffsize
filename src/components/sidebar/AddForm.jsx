import { useState } from "react";
import "./AddForm.css";
import { useQuery } from "@tanstack/react-query";

async function fetchCases() {
  console.log("fetching case data");
  const response = await fetch("/cases.json");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
}

function AddForm() {
  const [category, setCategory] = useState("case");
  const categories = ["case", "custom", "other"];
  const { isLoading, error, data } = useQuery({
    queryKey: ["cases"],
    queryFn: fetchCases,
  });

  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <form id="add-form" onSubmit={handleSubmit} className="add-form">
      <div className="add-form-category-row">
        <h3>Category:</h3>
        <div>
          {categories.map((categoryItem) => (
            <label
              key={categoryItem}
              htmlFor={categoryItem}
              className={`${category === categoryItem && "selected"}`}
            >
              <input
                type="radio"
                id={categoryItem}
                name="category"
                value={categoryItem}
                checked={category === categoryItem}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                className={`add-form-category-radio`}
              />
              {categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="name-select">Name: </label>
        {isLoading && "Loading..."}
        {error && "Error fetching cases"}
        {data && (
          <select name="cases" id="name-select">
            {Object.entries(data).map(([brand, cases]) => {
              return cases.map((caseItem, index) => (
                <option key={`${brand}-${index}`} value={caseItem.name}>
                  {`${brand} - ${caseItem.name}`}
                </option>
              ));
            })}
          </select>
        )}
      </div>
    </form>
  );
}

export default AddForm;
