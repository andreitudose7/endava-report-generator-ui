<template>
  <div class='application-footer'> Application created by Andrei Tudose (2D) for Endava. Copyright © 2021 Tudose Andrei, All rights reserved </div>
</template>

<script>
export default {
  name: 'ApplicationFooter'
}
</script>

<style>
  .application-footer {
    position: fixed;
    z-index: 99999;
    bottom: 0;
    width: 100%;
    background-color: #f0f0f1;
    box-shadow: 0 -1px 5px 0 rgba(0,0,0,.16), 0 -1px 10px 0 rgba(0,0,0,.12);
    color: #000;
    height: 20px;
    font-size: 12px;
  }
</style>