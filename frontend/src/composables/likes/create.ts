import { ref } from "vue";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default () => {
  const loading = ref(false);
  const success = ref(false);

  const createLike = async (id: string | "") => {
    loading.value = true;

    try {
      const { data } = await axios.post(
        `/api/likes/create?postId=${id}`,
        config
      );

      if (data) {
        loading.value = false;
        success.value = true;
      }
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };

  return { loading, success, createLike };
};
