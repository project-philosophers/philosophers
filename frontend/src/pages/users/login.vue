<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import axios from 'axios';

  import { useUserInfo } from '@/stores/userInfo';
  import { storeToRefs } from 'pinia';
  const storeUserInfo = useUserInfo();
  const { userInfo } = storeToRefs(storeUserInfo);

  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const handleClick = () => {
    // validation
    const userinfo = {
      'email': email.value,
      'password': password.value,
    }
    // console.log(userinfo);

    axios.post('/api/users/login', {
      data: userinfo
    })
    .then(res => {
      const userData = res.data;
      storeUserInfo.addUserInfo(userData);
      console.log(userInfo.value);
      router.push('/philosophers');
    })
    .catch(err => console.log(err.response));
  }
</script>

<template>
  <div class='login'>
    <div class="h-screen flex flex-wrap justify-center content-center p-10 bg-gray-100">
      <div class="w-6/12 bg-white rounded-xl relative py-8 px-16 h-fit">
        <form class="w-full flex justify-between flex-wrap">
          <span class="login-form-title block w-full text-2xl text-left text-gray-500 py-7 leading-5 uppercase">Login</span>
          <!-- <span class="form-label text-sm	py-2 text-gray-500 uppercase">Username</span> -->
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
          <div class="flex justify-between items-center w-full pb-8">
            <div class="contact100-form-checkbox">
              <input class="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="ckb1" type="checkbox" name="remember-me">
              <label class="block relative pl-2 text-gray-400 cursor-pointer whitespace-nowrap" for="ckb1">Remember me</label>
            </div>
            <div>
              <a href="#" class="text-sm text-gray-500">Forgot Password?</a>
            </div>
          </div>
          <div class="w-full flex flex-wrap">
            <div class="flex justify-center items-center px-1 bg-gray-600 text-white rounded-xl h-8 min-w-[150px]" @click="handleClick()">Login</div>
          </div>
        </form>
      </div>
    </div>
    <!-- <a href="https://colorlib.com/etc/lf/Login_v14/index.html">參考樣式</a> -->
  </div>
</template>

<style>

</style>