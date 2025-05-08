export default async function fetchCases() {
    console.log("fetching case data");
    const response = await fetch("/cases.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
}