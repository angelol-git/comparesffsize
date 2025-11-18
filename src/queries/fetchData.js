export async function fetchCases() {
    console.log("fetching case data");
    const response = await fetch("/cases.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
}

export async function fetchOther() {
    console.log("fetching other data");
    const response = await fetch("/other.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const otherData = await response.json();
    return otherData;
}


