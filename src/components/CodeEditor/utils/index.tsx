'use server'

export const sendCode = async (code:string): Promise<object | null> => {
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
    const data = await response.json();
    console.log(data)

    return data;
  } catch (error) {
    console.error("Error sending code:", error);
    return null; // Re-throw the error for the caller to handle
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

export const saveTemplate = async (code: string, name: string ): Promise<string> => {
  const api = "/api/v1/save-templates";
  const url = `${process.env.SERVER_ENDPOINT}${api}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: name,  code }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error sending code:", error);
    return ""; // Re-throw the error for the caller to handle
  }
};