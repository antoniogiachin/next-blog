import { useState } from "react";

export const useApi = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getApi = async (path) => {
    setIsLoading(true);
    let data;
    try {
      const response = await fetch(path);

      data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }

    setIsLoading(false);
    return data;
  };

  const postApi = async (path, payload) => {
    setIsLoading(true);
    let data;
    try {
      const response = await fetch(path, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }

    setIsLoading(false);
    return data;
  };

  const putApi = async (path, payload, pathVar) => {
    setIsLoading(true);
    let data;
    try {
      const response = await fetch(`${path}/${pathVar}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }

    setIsLoading(false);
    return data;
  };

  const deleteApi = async (path, pathVar) => {
    setIsLoading(true);
    let data;
    try {
      const response = await fetch(`${path}/${pathVar}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }

    setIsLoading(false);
    return data;
  };

  return { isLoading, error, getApi, postApi, putApi, deleteApi };
};
