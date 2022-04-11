<script setup>
  import { ref } from 'vue';
  import { useState } from '../lib/state';

  const props = defineProps(['userName']);
  const userName = props.userName;

  const [isOpen, setIsOpen] = useState(false);

  // let dropdowns = document.querySelectorAll('.dropdown')
  // window.addEventListener('click', (event) => {
  //   if (isOpen.value) {
  //     // console.log(isOpen.value);
  //     dropdowns.forEach((dropdownButton) => {
  //       let dropdown = document.querySelector(`.${dropdownButton.dataset.dropdown}`)
  //       let targetIsDropdown = dropdown == event.target
  //       console.log(dropdown, targetIsDropdown);

  //       if (dropdownButton == event.target) {
  //         return
  //       }

  //       if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
  //         dropdown.classList.remove('show')
  //       }
  //     })
  //   }
  // })
</script>

<template>
  <!-- <div class='nav w-full h-12 flex justify-around items-center shadow-md'> -->
  <div class='nav w-full h-12 flex items-center'>
    <div class="ml-10 text-3xl">
      <a href="/">Falāsifa</a>
    </div>
    <div class="links ml-20 flex-row pl-10">
      <div><a href="/home">Home</a></div>
      <div class="pl-10 cursor-pointer" @click="setIsOpen(!isOpen)">data</div>
      <template v-if="isOpen">
        <div class="dropdown fixed top-10 ml-20 w-50 bg-white border-2 border-black rounded-1xl z-999">
          <ul class="divide-y">
            <!-- <li>Home</li> -->
            <li><a href="/philosophers">Philosophers</a></li>
            <li>Literature</li>
            <li>Keywords</li>
          </ul>
        </div>
      </template>
    </div>
    <div class="absolute right-10">
      <template v-if="!!userName">
        <a href="/users/_id" class="nav-item">{{ userName }}</a>        
      </template>
      <template v-else>
        <a href="/users/login" class="nav-item">Login</a>
      </template>
    </div>
  </div>
</template>

<style>
  .nav {
    /* display: flex;
    flex-direction: row; */
    border-bottom: 2px solid black;
    box-sizing: border-box
  }
  .links {
    display: flex;
  }
  .nav-item {
    margin-left: 15px;
  }
</style>