export async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}
export async function postJSON(url, { json, method }) {
    const res = await fetch(url, {
        method,
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error(
            `Something went wrong loading ${res.url}: ${res.statusText}`
        );
    }
    return await res.json();
}