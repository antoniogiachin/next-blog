import { useApi } from "./useApi";
import { useState } from "react";

export const useRefetcher = () => {
  const [refetched, setRefetched] = useState([]);

  const { getApi } = useApi();

  const parseQuery = (collection, query) => {
    let BASE_URL;
    switch (collection) {
      case "posts":
        BASE_URL = `/api/posts?`;
        break;
      case "reviews":
        BASE_URL = `/api/reviews?`;
        break;
      case "reactions":
        BASE_URL = `/api/reactions?`;
        break;
    }

    // query :{name: 'Antonio Giachin', email: "test@email.com"}

    let queries = [];
    for (const [key, value] of Object.entries(query)) {
      queries.push(`${key}=${value.replaceAll(" ", "%20")}`);
    }
    const queryString = queries.join("&");

    return { method: collection, string: `${BASE_URL}${queryString}` };
  };

  const refetch = async (collection, query) => {
    const { method, string } = parseQuery(collection, query);
    const res = await getApi(string);
    setRefetched(res[method]);
  };

  return { refetch, parseQuery, refetched };
};
