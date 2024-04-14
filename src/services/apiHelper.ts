import axios from "axios";

type RequestMethod = "GET" | "POST" | "PUT";

const API_BASE_URL = "/api";

const getFullUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

export async function makeApiRequest<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  data?: never,
  withCredentials: boolean = true
): Promise<T> {
  const url = getFullUrl(endpoint);

  let response;
  if (method === "GET") {
    response = await axios.get(url, { withCredentials });
  } else if (method === "POST") {
    response = await axios.post(url, data);
  } else if (method === "PUT") {
    response = await axios.put(url, data);
  }

  if (response) {
    return response.data;
  } else {
    throw new Error("Response is undefined");
  }
}
