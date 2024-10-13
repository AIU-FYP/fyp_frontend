<script setup>
import {ref} from 'vue'

let {$axios} = useNuxtApp()
const api = $axios()

const columns = [
  {name: 'ID', field: 'id'},
  {name: 'Name', field: 'name'},
  {name: 'Created At', field: 'createdAt'},
]

const tableData = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/hostelSysytem')
    console.log(response)
    tableData.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

</script>


<template>
  <div class="dashborad-section">
    <div class="container">
      <h2>Welcome back </h2>
      <hr class="divider"/>
      <div>
        <UTable :columns="columns" :rows="tableData"/>
      </div>
      <hr class="divider"/>
      <p>Thank you</p>
    </div>
  </div>
</template>

<style scoped>

.dashborad-section {
  margin: 5rem;
  background-color: #eeeeee;
  padding: 5rem 2%;
  border-radius: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}

.dashborad-section h2 {
  text-align: start;
  font-size: 2rem;
  color: var(--text-color);
  margin-top: -2rem;
  margin-bottom: 2rem;

}

.divider {
  border: 2px solid var(--text-color);
  margin: 1rem;
}

p {
  font-size: 1.2rem;
  text-align: center;
  color: var(--text-color);
}

</style>