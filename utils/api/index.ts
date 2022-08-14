import axios from "axios";

export interface BaseRequest {
  path: string;
}

const baseURL = `${process.env.NEXT_PUBLIC_API_HOST}`;

function printStackTrace() {
  const error = new Error();
  const stack = error.stack
    ?.split("\n")
    .slice(2)
    .map((line: string) => line.replace(/\s+at\s+/, ""))
    .join("\n");
  console.log(stack);
}

// T = ResponseType
export async function get<T>({ path }: BaseRequest): Promise<T> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  console.log({ path: `${baseURL}${path}` });
  const { data } = await axios.get<T>(`${baseURL}${path}`, {
    headers,
  });

  return data;
}
