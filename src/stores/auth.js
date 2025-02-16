import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
 
export const useAuth = defineStore("auth", () => {
  const router = useRouter();
  const accessToken = useStorage("access_token", "");
  const check = computed(() => !!accessToken.value);
  const user = useStorage("auth_user", {});
  const userEmail = computed(() => user.value?.email);
  const userName = computed(() => user.value?.name);
  const userPhoneNumber = computed(() => user.value?.phone_number);

  function setAccessToken(value) {
    accessToken.value = value;
    window.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken.value}`;
  }
 
  async function login(accessToken) {
    setAccessToken(accessToken);
    await fetchAuthUser();
    router.push({ name: "organization.dashboard" });
  }
 
  function destroyTokenAndRedirectTo(routeName = "welcome") {
    setAccessToken(null);
    setAuthUserData(null);
    router.push({ name: routeName });
  }
 
  async function logout() {
    return window.axios.post("api/v1/auth/logout").finally(() => {
      destroyTokenAndRedirectTo();
    });
  }
  const fetchAuthUser = async () => {
    try {
      const response = await window.axios.get("api/v1/user", {
        headers: { Authorization: `Bearer ${accessToken.value}`},
      });
      if (response.status !== 200) throw new Error("Failed to fetch user");
      console.log(response)
      setAuthUserData(response?.data || null) 
    } catch (error) {
      setAuthUserData(null);
      throw error
    }
  }
  const setAuthUserData = (userData) => {
    user.value = userData;
  }
 
  return { 
    login, 
    logout, 
    check, 
    userEmail,
    user,
    userName,
    userPhoneNumber,
    destroyTokenAndRedirectTo 
  };
});