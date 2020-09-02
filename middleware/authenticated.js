export default ({ store, redirect }) => {
  // If the user is not authenticated
  if (!store.getters.currentUser) {
    return redirect('/admin/login')
  }
}
