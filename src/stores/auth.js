import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
 
export const useAuth = defineStore("auth", () => {
  const router = useRouter();
  const accessToken = useStorage("access_token", "");
  const check = computed(() => !!accessToken.value);
  const user = ref(null);
  
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
    router.push({ name: routeName });
  }
 
  async function logout() {
    return window.axios.post("v1/auth/logout").finally(() => {
      resetUserData();
      destroyTokenAndRedirectTo();
    });
  }
  const fetchAuthUser = async () => {
    try {
      const response = await window.axios.get("/v1/user");
      storeUserData(response?.data || null) 
    } catch (error) {
      resetUserData()
      throw error
    }
  }
  const storeUserData = (userData) => {
    if (!userData) return;
    user.value = userData;
  }
  const resetUserData = () => {
    user.value = null;
  }
 
  return { 
    login, 
    logout, 
    check, 
    userEmail,
    userName,
    userPhoneNumber,
    destroyTokenAndRedirectTo 
  };
});