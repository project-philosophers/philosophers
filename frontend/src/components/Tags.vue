<script setup>
// name -> id


// import { ref } from 'vue'

// const props = defineProps(['tagsInfo']);
const tagsInfo = {
  index: 'languages',
  oldCheckedTags: ['German']
}



const tagsIndex = tagsInfo.index;
// const tagsIndex = defineProps(['tagsIndex']);
const tagsList = ['German', 'Latin', 'Latin1', 'La2tin', 'L3atin', 'L4atin', 'Lat5in', 'Lat6in'];
let checkedTagsList = tagsInfo.oldCheckedTags;

const handleCheck = (e) => {
  checkedTagsList.push(e.target.id);
}

const emit = defineEmits(['newCheckedTags']);
const done = () => {
  console.log(checkedTagsList);
  emit('newCheckedTags', checkedTagsList);
}

</script>

<template>
  <div class='tags-container'>
    <div>{{ tagsIndex }}</div>
    <div class='tags-list'>
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
    <div
      class="done"
      @click="done"
    >
      OK
    </div>
  </div>
</template>

<style>
.tags-container {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 200px;
  border: 1px solid black;
}
.tags-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: scroll;
  width: 90%;
  height: 70%;
  margin-left: 5%;
}
.tags-list .tag {
  position: relative;
  width: 150px;
  height: 18px;
}
.tags-list .tag input {
  position: absolute;
  bottom: 0;
  cursor: pointer;
}
.tags-list .tag label {
  position: absolute;
  left: 20px;
  font-size: 15px;
  cursor: pointer;
}
.done {
  cursor: pointer;
}
</style>