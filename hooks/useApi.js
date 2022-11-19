// REDUX
import { SET_LOADING_STATUS, SET_ERROR } from "../store/slicers/appStatusSlice";
import { useDispatch } from "react-redux";

export const useApi = () => {
  const dispatch = useDispatch();

  const getApi = async (path) => {
    dispatch(SET_LOADING_STATUS(true));
    let data;
    try {
      const response = await fetch(path);

      data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      dispatch(SET_LOADING_STATUS(false));
      dispatch(SET_ERROR(err.message));
    }

    dispatch(SET_LOADING_STATUS(false));

    return data;
  };

  const postApi = async (path, payload, isFormData = false) => {
    dispatch(SET_LOADING_STATUS(true));
    let options;
    if (isFormData) {
      options = {
        method: "POST",
        body: payload,
      };
    } else {
      options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    let data;
    try {
      const response = await fetch(path, options);

      data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err.message);
      dispatch(SET_LOADING_STATUS(false));
      dispatch(SET_ERROR(err.message));
    }

    dispatch(SET_LOADING_STATUS(false));
    return data;
  };

  const putApi = async (path, payload, pathVar) => {
    dispatch(SET_LOADING_STATUS(true));
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
      dispatch(SET_LOADING_STATUS(false));
      dispatch(SET_ERROR(err.message));
    }

    dispatch(SET_LOADING_STATUS(false));
    return data;
  };

  const deleteApi = async (path, pathVar) => {
    dispatch(SET_LOADING_STATUS(true));
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
      dispatch(SET_LOADING_STATUS(false));
      dispatch(SET_ERROR(err.message));
    }

    dispatch(SET_LOADING_STATUS(false));
    return data;
  };

  return { getApi, postApi, putApi, deleteApi };
};
