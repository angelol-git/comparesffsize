export default async function fetchOther() {
    console.log("fetching other data");
    const response = await fetch("/other.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const otherData = await response.json();
    return otherData;
}


