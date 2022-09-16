<template>
    <div :class="{ select: true, [extraClassName]: extraClassName ? true: false }" tabindex="1">
        <template v-for="item in dataSource" :key="item.value">
            <input
                class="selectopt"
                :value="item.value"
                :name="widgetId"
                type="radio"
                :id="widgetId + '-evaluation-option-' + item.label"
                :checked="modelValue == item.value"
                @click="$emit('update:modelValue', $event.target.value)"
            />
            <label
                :for="widgetId + '-evaluation-option-' + item.label"
                :class="{
                  option: true,
                  active: modelValue == item.value
                }"
            >
              {{ item.label }}
            </label>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: [
        'modelValue',
        'widgetId',
        'dataSource',
        'extraClassName'
    ]
}
</script>

<style>
.select {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 175px;
  height: 40px;
}

.select .option {
  padding:0 30px 0 10px;
  min-height:40px;
  display:flex;
  align-items:center;
  background:#eee;
  border-top:#eee solid 1px;
  position:absolute;
  top:0;
  width: 100%;
  pointer-events:none;
  order:2;
  z-index:1;
  transition:background .4s ease-in-out;
  box-sizing:border-box;
  overflow:hidden;
  white-space:nowrap;
}

.select .option:hover {
  background:rgb(211, 211, 211);
}
.select .option.active {
  background: #eee;
}

.select:focus .option {
  position:relative;
  pointer-events:all;
}

.select input {
  opacity: 0;
  position: absolute;
  left: -99999px;
}

.select input:checked + label {
  order: 1;
  z-index:2;
  background: #eee;
  border-top:none;
  position:relative;
}

.select input:checked + label:after {
  content:'';
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
  position:absolute;
  right:10px;
  top:calc(50% - 2.5px);
  pointer-events:none;
  z-index:3;
}

.select input:checked + label:before {
  position:absolute;
  right:0;
  height: 40px;
  width: 40px;
  content: '';
  background:#eee;
}
</style>