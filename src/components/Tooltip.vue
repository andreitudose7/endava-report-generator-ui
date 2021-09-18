<template>
  <span :class="{
    'tooltip-container': true,
    'available': available
  }">
    <i :class="'fa ' + faIconName" aria-hidden="true"></i>
    <div class="message-container"> {{ message }} </div>
  </span>
</template>

<script>
export default {
  name: 'Tooltip',
  props: [
    'available',
    'faIconName',
    'message'
  ]
}
</script>

<style>
  .tooltip-container {
    display: none;
    font-size: 13px;
    position: relative;
    bottom: 10px;
    left: 5px;
    cursor: pointer;
  }
  .tooltip-container.available {
    display: initial;
  }
  .message-container {
    display: none;
    position: fixed;
    top: 15px;
    right: 20px;
    font-size: 16px;
    font-weight: normal;
    background: bisque;
    box-shadow: 0px 0px 4px #888888bb;
    min-width: 300px;
    max-width: 450px;
    padding: 10px 15px;
    box-sizing: border-box;
    z-index: 4;
  }
  .tooltip-container:hover {
    color: rgb(82, 82, 82);
  }
  .tooltip-container:hover .message-container {
    display: inline-block;
  }
</style>