import { useSweetAlert } from "@/composables/useSweetAlert2";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useMemberStore = defineStore("memberStore", () => {
  const {showToast, showConfirmDialog} = useSweetAlert();
  const errors = reactive({});
  const loading = ref(false);
  const router = useRouter();
  const route = useRoute();
  const memberList = ref(null);
  const members = ref(null);
  const searchInput = ref(route.query.search || '')
  const form = reactive({
      name: '',
      email: '',
      role: 'member'
  });
  const pagination = reactive({
      current_page: 1,
      last_page: 0,
      links: {},
      from: 0,
      to: 0,
      total: 0,
    })
  const resetForm = () => {
      form.name = "";
      form.email = "";
      form.role = "member";
      errors.value = {};
  }
  const debounceSearch = debounce((newSearch) => {
      router
        .replace({
          query: newSearch ? { search: newSearch } : {},
        })
        .then(() => {
          getMembers()
        })
    }, 300)

  const orderBy = (column = 'created_at') => {
      const toggleDirection = route.query.direction === 'desc' ? 'asc' : 'desc'
      updateRouteQuery({ column, direction: toggleDirection })
  }
  const changePage = (pageUrl) => {
      console.log(pageUrl)
      if (!pageUrl) return

      const params = new URLSearchParams(new URL(pageUrl).search)
      const page = params.get('page')

      if (page) {
          updateRouteQuery({ page: page })
      }
  }
  const updateRouteQuery = (params = {}) => {
      router
        .push({
          query: {
            ...route.query,
            ...params,
          },
        })
        .then(() => getMembers())
    }

  const handleSubmit = async () => {
      if (loading.value) return;

      loading.value = true;
      errors.value = {};
      return window.axios
          .post("v1/tenant/members", form)
          .then((response) => {
              showToast('New Member Added to Your Organization');
              router.push({name: 'members.index'})
          })
          .catch((error) => {
              if (error?.response?.status === 422) {
                  console.log(error.response.data.errors);
                  errors.value = error.response.data.errors;
              }
          })
          .finally(() =>{
              loading.value = false
          });
  }

  const getMembers = async () => {
      return window.axios
          .get("v1/tenant/members", { params:  route.query })
          .then((response) => {
              const membersData = response?.data
              if (membersData) {
                members.value = membersData.data
                pagination.current_page = membersData.meta.current_page || 1
                pagination.links = membersData.meta?.links || {}
                pagination.last_page = membersData.meta?.last_page || 0
                pagination.total = membersData.meta?.total || 0
                pagination.from = membersData.meta?.from || 0
                pagination.to = membersData.meta?.to || 0
              }
          })
          .catch((error) => {
              console.error('Error on fetching members', error)
          })
  }

  const getMemberListWithoutPagination = async () => {
    return window.axios
      .get("v1/tenant/members/list")
      .then(response => {
        memberList.value = response?.data?.data;
      })
      .catch(error => {
        console.error('Error on fetching member list', error)
      })
      
  }

  const deleteMember = async (member) => {
    if(loading.value) return;

    loading.value = true;
    showConfirmDialog()
      .then((result =>{
        if (result.isConfirmed) {
          return window.axios
          .delete(`v1/tenant/members/${member.id}`)
          .then((response => {
              getMembers()
              showToast("Member deleted Successfully")
          }))
          .catch(error => {
            showToast("Member deleted failed", 'error');
            console.error('Error on deleting the member', error)
          })
          .finally(() => loading.value = false)
        } else {
          loading.value = false;
        }
      }))
  }

  return {
      resetForm,
      handleSubmit,
      getMembers,
      changePage,
      orderBy,
      deleteMember,
      getMemberListWithoutPagination,
      debounceSearch,
      memberList,
      pagination,
      searchInput,
      errors,
      members,
      form
  }
});