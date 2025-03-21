'use server'

export const sendCode = async (code:string) => {
  const api = "/api/v1/plot/lab";
  const url = `${process.env.SERVER_ENDPOINT}${api}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending code:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};