import { inject } from 'vue'

export function useSweetAlert() {
  const swal = inject('$swal')

  const showToast = (title = 'Successfully', icon = 'success',toast = true) => {
    return swal.fire({
      toast,
      icon,
      title,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      width: '450px'
    })
  }

  const showConfirmDialog = (
    title = 'Are you sure?',
    text = "You won't be able to revert this!",
    icon = 'warning',
    confirmButtonText = 'Yes, delete it!',
    cancelButtonColor = '#d33',
    confirmButtonColor = '#3085d6',
    showCancelButton = true,
  ) => {
    return swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonColor,
      cancelButtonColor,
      confirmButtonText,
    })
  }

  return {
    showToast,
    showConfirmDialog,
  }
}
