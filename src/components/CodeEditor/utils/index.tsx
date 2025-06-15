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

export const saveData = async (data: any ): Promise<string> => {
  console.log(data);
  const api = "/api/v1/save-statistic-data";
  const url = `${process.env.SERVER_ENDPOINT}${api}`;

  try {
    let body;
    let headers: HeadersInit = {};

    // Check if data contains file(s)
    if (data instanceof FormData) {
      // If data is already FormData, use it directly
      body = data;
      // Don't set Content-Type header for FormData, let browser set it with boundary
    } else if (data && typeof data === 'object' && data.file instanceof File) {
      // If data contains a File object, create FormData
      const formData = new FormData();
      formData.append('file', data.file);
      
      // Add other data fields if they exist
      Object.keys(data).forEach(key => {
        if (key !== 'file' && data[key] !== undefined) {
          formData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
        }
      });
      
      body = formData;
    } else {
      // For non-file data, send as JSON
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error("Error sending data:", error);
    return "";
  }
};