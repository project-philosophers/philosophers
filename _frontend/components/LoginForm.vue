<script>
export default {
  name: 'LoginForm'
}
</script>

<template>
  <div>
    <div class="h-screen flex flex-wrap justify-center content-center p-10 bg-gray-100">
      <div class="w-5/12 bg-white rounded-xl	relative py-12 px-20 h-fit">
        <form class="w-full flex justify-between flex-wrap">
          <span class="login-form-title block w-full text-2xl text-left text-gray-500 py-7 leading-5 uppercase">Account Login</span>
          <span class="form-label text-sm	py-2 text-gray-500 uppercase">Username</span>
          <div class="w-full rounded-sm	border-1 relative bg-white validate-input mb-8" data-validate="Username is required">
            <input class="block w-full text-gray-500 bg-transparent h-fit py-4 px-3" type="text" name="username">
            <span class="focus-input100"></span>
          </div>
          <span class="form-label text-sm	py-2 text-gray-500 uppercase">Password</span>
          <div class="w-full rounded-sm	border-1 relative bg-white validate-input mb-8" data-validate="Password is required">
            <!-- TODO fix fontAwesome -->
            <!-- <span class="btn-show-pass">
              <i class="fa fa-eye"></i>
            </span> -->
            <input class="block w-full text-gray-500 bg-transparent h-fit py-4 px-3" type="password" name="password">
            <span class="focus-input100"></span>
          </div>
          <div class="flex justify-between items-center w-full pb-8">
            <div class="contact100-form-checkbox">
              <input class="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="ckb1" type="checkbox" name="remember-me">
                <label class="block relative pl-4 text-gray-400 cursor-pointer whitespace-nowrap" for="ckb1">Remember me</label>
              </div>
              <div>
                <a href="#" class="text-sm text-gray-500">Forgot Password?</a>
              </div>
            </div>
            <div class="w-full flex flex-wrap">
              <button class="flex justify-center items-center px-1 bg-gray-600 text-white rounded-xl h-8 min-w-[150px]">Login</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
  .login-form-title{
    font-family: Raleway-Medium;
  }
  .form-label {
    font-family: Raleway-SemiBold;
  }
  .input100 {
    font-family: Raleway-Medium;
  }
  .label-checkbox100 {
    font-family: Raleway-Regular;
  }
  /* .focus-input100{
    position: absolute;
    display: block;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    top: -1px;
    left: -1px;
    pointer-events: none;
    border: 1px solid #57b846;
    border-radius: 3px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;
    transform: scaleX(1.1) scaleY(1.3);
  } */
  /* TODO fix fontAwesome*/
  /* .btn-show-pass {
    font-size: 15px;
    color: #999999;
    display: flex;
    align-items: center;
    position: absolute;
    height: 100%;
    top: 0;
    right: 12px;
    padding: 0 5px;
    cursor: pointer;
    transition: background 0.4s;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
  }
  .fa-eye:before {
    content: "\f06e";
  } */
</style>