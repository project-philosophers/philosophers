<script>
export default {
  name: 'LoginForm'
}
</script>

<template>
  <div>
    <div class="container">
      <div class="login-form-wrapper">
        <form class="login-form">
          <span class="login-form-title p-b-32">Account Login</span>
          <span class="form-label p-b-11">Username</span>
          <div class="wrap-input100 validate-input m-b-36" data-validate="Username is required">
            <input class="input100" type="text" name="username">
            <span class="focus-input100"></span>
          </div>
          <span class="form-label p-b-11">Password</span>
          <div class="wrap-input100 validate-input m-b-12" data-validate="Password is required">
            <span class="btn-show-pass">
              <i class="fa fa-eye"></i>
            </span>
            <input class="input100" type="password" name="pass">
            <span class="focus-input100"></span>
          </div>
          <div class="flex-sb-m w-full p-b-48">
            <div class="contact100-form-checkbox">
              <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
                <label class="label-checkbox100" for="ckb1">Remember me</label>
              </div>
              <div>
                <a href="#" class="txt3">Forgot Password?</a>
              </div>
            </div>
            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Login</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
  .container {
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-color: #ebebeb;
  }

  .login-form-wrapper {
    width: 560px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    padding: 85px 55px;
  }

  .login-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .login-form-title{
    font-family: Raleway-Medium;
    font-size: 30px;
    color: #555555;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: left;
    width: 100%;
    display: block;
  }
  .form-label {
    font-family: Raleway-SemiBold;
    font-size: 13px;
    color: #555555;
    line-height: 1.4;
    text-transform: uppercase;
    padding-bottom: 11px;
  }
  .wrap-input100{
    width: 100%;
    position: relative;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
  }

  .input100 {
    font-family: Raleway-Medium;
    color: #555555;
    line-height: 1.2;
    font-size: 18px;
    display: block;
    width: 100%;
    background: transparent;
    height: 55px;
    padding: 0 25px 0 25px;
  }
  input {
    outline: none;
    border: none;
  }
  .focus-input100{
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
  }
  .btn-show-pass {
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
  }
  .flex-sb-m {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .w-full {
    width: 100%;
  }
  .p-b-48 {
    padding-bottom: 48px;
  }

  .input-checkbox100 {
      display: none;
  }
  .label-checkbox100 {
    font-family: Raleway-Regular;
    font-size: 13px;
    color: #999999;
    line-height: 1.4;
    display: block;
    position: relative;
    padding-left: 26px;
    cursor: pointer;
}
.label-checkbox100::before {
    content: "\f00c";
    font-family: FontAwesome;
    font-size: 13px;
    color: transparent;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    background: #fff;
    border: 1px solid #e6e6e6;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
}
.txt3 {
    font-family: Raleway-Regular;
    font-size: 13px;
    color: #555555;
    line-height: 1.4;
}
a {
    font-family: Raleway-Regular;
    font-size: 14px;
    line-height: 1.7;
    color: #666666;
    margin: 0px;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
}
.container-login100-form-btn{
      width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
}
.login100-form-btn {
    font-family: Raleway-Bold;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 150px;
    height: 55px;
    background-color: #333333;
    border-radius: 27px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}
button {
    outline: none !important;
    border: none;
    background: transparent;
}
</style>