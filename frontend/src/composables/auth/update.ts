import { ref } from "vue";
import axios, { AxiosError } from "axios";

interface userData {
  id?: string;
  username: string | "";
  email: string | "";
  password?: string | "";
  isAdmin?: boolean;
}

export const useUpdateAccount = () => {
  const success = ref(false);
  const error = ref(null);
  const loading = ref(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const updateAccount = async (userData: userData) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put("/api/users/update", userData, config);

      if (data) {
        loading.value = false;
        success.value = true;
      }
    } catch (er) {
      const err = er as AxiosError;
      loading.value = false;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return { success, error, loading, updateAccount };
};

export const useEditAccountByAdmin = () => {
  const success = ref(false);
  const error = ref(null);
  const loading = ref(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const editAccount = async (userData: userData) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put(
        `/api/users/admin/edit/${userData.id}`,
        userData,
        config
      );

      if (data) {
        loading.value = false;
        success.value = true;
      }
    } catch (er) {
      const err = er as AxiosError;
      loading.value = false;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return { success, error, loading, editAccount };
};
