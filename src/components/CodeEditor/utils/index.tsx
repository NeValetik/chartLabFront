'use server'

export const sendCode = async (code:string): Promise<string> => {
  const api = "/api/v1/plot-lab";
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
    const blob = await response.blob();

    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error("Error sending code:", error);
    return ""; // Re-throw the error for the caller to handle
  }
};

export interface TemplateResponse
{
  key: string; 
  label: string;
  code: string;
}

export const fetchTemplates = async (): Promise<TemplateResponse[]> => {
  const api = "/api/v1/files";
  const url = `${process.env.SERVER_ENDPOINT}${api}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};