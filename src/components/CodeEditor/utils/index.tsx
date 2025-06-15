'use server'

export const sendCode = async (code:string): Promise<object[] | null> => {
  const api = "/api/v1/get-chart";
  const url = `${process.env.SERVER_ENDPOINT}${api}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    const retValue = data.plots.map((plot: string)=>JSON.parse(plot));
    console.log(retValue);
    // console.dir(retValue, { depth: null })

    return retValue;
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

export interface StatisticDataResponse
{
  key: string; 
  label: string;
  code: string;
}

export const fetchTemplates = async (): Promise<TemplateResponse[]> => {
  const api = "/api/v1/get-templates";
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

export const fetchStatisticData = async (): Promise<StatisticDataResponse[]> => {
  const api = "/api/v1/get-statistic-data";
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
  const api = "/api/v1/save-template";
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

export const saveData = async (file: File): Promise<string> => {
  console.log(file);
  const api = "/api/v1/save-statistic-data";
  const url = `${process.env.SERVER_ENDPOINT}${api}`;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error("Error sending file:", error);
    return "";
  }
};