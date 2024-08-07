async function fetchWorkplaces() {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
        throw new Error("Failed to fetch workplaces");
    }
    return await response.json();
}

export default fetchWorkplaces;
