import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUI } from "../contexts/ui.context";
import { useHomeSeo } from "../contexts/home.context";

export const useMetafieldsQuery = ({
  url,
  fetchInit = {},
  reactQueryOptions,
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const { organization, setOrganization } = useHomeSeo();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [JSON.stringify(fetchInit)]);

  return useQuery("metafieldList", fetch, {
    ...reactQueryOptions,
    onSuccess: (data) => {
      console.log(data);
      if (
        typeof data.data === "object" &&
        Object.entries(data.data).length > 0
      ) {
        setOrganization({ ...organization, ...data.data.organization });
      }
    },
    refetchOnWindowFocus: false,
  });
};

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
      if (data?.status !== 200) {
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
