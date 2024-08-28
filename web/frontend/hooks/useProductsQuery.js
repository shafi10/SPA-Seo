import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUI } from "../contexts/ui.context";

export const useProductsQuery = ({
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

  return useQuery("productList", fetch, {
    ...reactQueryOptions,
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
    // enabled: Object.keys(shop).length === 0,
  });
};

export const useProductsQueryByID = ({ url, id }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, {});
      return response.json();
    };
  }, [url]);

  return useQuery(url, fetch, {
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
    enabled: id !== null,
  });
};

export const useCreateProductSeo = () => {
  const fetch = useAuthenticatedFetch();
  const { setCloseModal, setToggleToast } = useUI();
  const queryClient = useQueryClient();
  async function createStatus(status) {
    return await fetch("/api/product/update-product-seo", {
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
      queryClient.invalidateQueries("productList");

      setToggleToast({
        active: true,
        message: `Submit Successfully`,
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

export const useUpdateProductSeoImgAlt = () => {
  const fetch = useAuthenticatedFetch();
  const { setCloseModal, setToggleToast } = useUI();
  const queryClient = useQueryClient();
  async function createStatus(status) {
    return await fetch(`/api/product/update-image-alt`, {
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
      queryClient.invalidateQueries("productList");

      setToggleToast({
        active: true,
        message: `Submit Successfully`,
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

// export const useProductHighlightQuery = ({ url, id }) => {
//   const authenticatedFetch = useAuthenticatedFetch();
//   const fetch = useMemo(() => {
//     return async () => {
//       const response = await authenticatedFetch(url, {});
//       return response.json();
//     };
//   }, [url]);

//   return useQuery("highlight", fetch, {
//     onSuccess: (data) => {},
//     refetchOnWindowFocus: false,
//     enabled: id !== null,
//   });
// };

// export const useHideOrShowProductHighlight = () => {
//   const fetch = useAuthenticatedFetch();
//   const { setToggleToast } = useUI();
//   async function createStatus(status) {
//     return await fetch("/api/product/hide-or-show-highlight", {
//       method: "POST",
//       body: JSON.stringify(status),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   return useMutation((status) => createStatus(status), {
//     onSuccess: async (data, obj) => {
//       const res = await data.json();
//       setToggleToast({
//         active: true,
//         message:
//           res === "yes"
//             ? `Feature Highlight Show Successfully`
//             : "Feature Highlight Hide Successfully",
//       });
//     },
//     refetchOnWindowFocus: false,
//   });
// };
