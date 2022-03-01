<script setup>
import { ref } from 'vue'


// const tagsIndeces = [
//   categories,
//   education,
//   keywords,
//   languages,
//   nationalities
// ];

const tagsIndex = 'languages';
// const tagsIndex = defineProps(['tagsIndex']);
const tagsList = ['German', 'Latinnnnnnn', 'Latin1', 'La2tin', 'L3atin', 'L4atin', 'Lat5in', 'Lat6in'];
const checkedTagsList = ['German']

const handleCheck = (e) => {
  console.log(e.target.id);
}

</script>

<template>
  <div class='container'>
    <div>{{ tagsIndex }}</div>
    <div class='tags'>
      <template v-for="t in tagsList">
        <div class="tag">
          <input
            type="checkbox"
            :name="t"
            :id="t"
            :checked="checkedTagsList.includes(t)"
            @change="(e) => handleCheck(e)"
          />
          <label
            :for="t"
          >
            {{ t }}
          </label>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.tags {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: scroll;
  width: 200px;
  height: 100px;
  border: 1px solid black;
}
.tags .tag {
  position: relative;
  /* width: 100px; */
  height: 18px;
}
.tags .tag input {
  position: absolute;
  bottom: 0;
  cursor: pointer;
}
.tags .tag label {
  position: absolute;
  left: 20px;
  font-size: 15px;
  cursor: pointer;
}
</style>