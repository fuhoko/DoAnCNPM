<script>
export default {
  middleware: [
    ({ redirect }) => {
      redirect('/admin/role')
    },
  ],
}
</script>
