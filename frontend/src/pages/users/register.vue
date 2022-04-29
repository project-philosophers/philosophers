<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const username = ref('');
  const email = ref('');
  const password = ref('');

  const handleClick = () => {
    // validation
    const userinfo = {
      'name': username.value,
      'email': email.value,
      'password': password.value,
    }
    console.log(userinfo);

    axios.post('/api/users/register', {
      userinfo: userinfo
    })
    .catch(err => console.log(err.response));
  }
</script>

<template>
  <!-- <Nav /> -->
  <div class='register'>
    <div class="h-screen flex flex-wrap justify-center content-center p-10 bg-gray-100">
      <div class="w-6/12 bg-white rounded-xl relative py-8 px-16 h-fit">
        <form class="w-full flex justify-between flex-wrap">
          <span class="login-form-title block w-full text-2xl text-left text-gray-500 py-5 leading-5 uppercase">Register</span>
          <!-- <span class="form-label text-sm	py-2 text-gray-500 uppercase">Username</span> -->
          <div class="w-full rounded-sm	border-1 relative bg-white validate-input mb-5" data-validate="Username is required">
            <input class="block w-full text-gray-500 bg-transparent h-fit py-3 px-3" type="text" name="username" placeholder="username" v-model="username">
            <span class="focus-input100"></span>
          </div>
          <!-- <span class="form-label text-sm	py-2 text-gray-500 uppercase">Email</span> -->
          <div class="w-full rounded-sm	border-1 relative bg-white validate-input mb-5" data-validate="Email is required">
            <input class="block w-full text-gray-500 bg-transparent h-fit py-3 px-3" type="text" name="email" placeholder="email" v-model="email">
            <span class="focus-input100"></span>
          </div>
          <!-- <span class="form-label text-sm	py-2 text-gray-500 uppercase">Password</span> -->
          <div class="w-full rounded-sm	border-1 relative bg-white validate-input mb-5" data-validate="Password is required">
            <!-- TODO fix fontAwesome -->
            <!-- <span class="btn-show-pass">
              <i class="fa fa-eye"></i>
            </span> -->
            <input class="block w-full text-gray-500 bg-transparent h-fit py-3 px-3" type="password" name="password" placeholder="password" v-model="password">
            <span class="focus-input100"></span>
          </div>
          <div class="w-full flex flex-wrap">
            <!-- <button class="flex justify-center items-center px-1 bg-gray-600 text-white rounded-xl h-8 min-w-[150px]" @click="handleClick()">Register</button> -->
            <div class="flex justify-center items-center px-1 bg-gray-600 text-white rounded-xl h-8 min-w-[150px] cursor-default" @click="handleClick()">Register</div>
          </div>
        </form>
      </div>
    </div>
    <!-- <a href="https://colorlib.com/etc/lf/Login_v14/index.html">參考樣式</a> -->
  </div>
</template>

<style>

</style>