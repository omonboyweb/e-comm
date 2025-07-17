const API = "https://fakestoreapi.com/";

export async function getApi(path, id) {
  try {
    const response = await fetch(`${API}${path}${id ? `/${id}` : ""}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
