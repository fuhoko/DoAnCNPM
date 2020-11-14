export default ({ store, error }) => {
  if (
    !store.getters.currentUser.role.permissions.some(
      (item) => item.name === 'ALL' || item.name === 'ROLE_READ'
    )
  ) {
    error({ statusCode: 403 })
  }
}
