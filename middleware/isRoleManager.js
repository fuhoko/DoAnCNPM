export default ({ store, error }) => {
  if (
    !store.getters.currentUser.role.permissions.some(
      (item) => item.id === 1 || item.id === 2
    )
  ) {
    error({ statusCode: 403 })
  }
}
