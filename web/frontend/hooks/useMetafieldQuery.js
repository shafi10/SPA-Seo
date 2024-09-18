import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUI } from "../contexts/ui.context";

export const useMetafieldsQuery = ({
  url,
  fetchInit = {},
  reactQueryOptions,
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useQuery("metafieldList", fetch, {
    ...reactQueryOptions,
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
    // enabled: Object.keys(shop).length === 0,
  });
};

// export const useProductsQueryByID = ({ url, id }) => {
//   const authenticatedFetch = useAuthenticatedFetch();
//   const fetch = useMemo(() => {
//     return async () => {
//       const response = await authenticatedFetch(url, {});
//       return response.json();
//     };
//   }, [url]);

//   return useQuery(url, fetch, {
//     onSuccess: (data) => {},
//     refetchOnWindowFocus: false,
//     enabled: id !== null,
//   });
// };

export const useCreateMetafield = () => {
  const fetch = useAuthenticatedFetch();
  const { setCloseModal, setToggleToast } = useUI();
  const queryClient = useQueryClient();
  async function createStatus(status) {
    return await fetch("/api/metafields/create", {
      method: "POST",
      body: JSON.stringify(status),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return useMutation((status) => createStatus(status), {
    onSuccess: async (data, obj) => {
      if (data?.status === 400) {
        return setToggleToast({
          active: true,
          message: `Something went wrong`,
        });
      }
      setCloseModal();
      queryClient.invalidateQueries("metafieldList");

      setToggleToast({
        active: true,
        message: `Successfully created metafield`,
      });
    },
    onError: async () => {
      setToggleToast({
        active: true,
        message: `Something went wrong`,
      });
    },
    refetchOnWindowFocus: false,
  });
};
