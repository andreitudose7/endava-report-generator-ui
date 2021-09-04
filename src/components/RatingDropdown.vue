<template>
    <div class="select" tabindex="1">
        <input
            class="selectopt"
            value="-1"
            :name="widgetId"
            type="radio"
            :id="widgetId + '-evaluation-option-None'"
            :checked="modelValue == -1"
            @click="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="widgetId + '-evaluation-option-None'" class="option">None</label>
        <input
            class="selectopt"
            value="0"
            :name="widgetId"
            type="radio"
            :id="widgetId + '-evaluation-option-Beginner'"
            :checked="modelValue == 0"
            @click="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="widgetId + '-evaluation-option-Beginner'" class="option">Beginner</label>
        <input
            class="selectopt"
            value="1"
            :name="widgetId"
            type="radio"
            :id="widgetId + '-evaluation-option-Intermediate'"
            :checked="modelValue == 1"
            @click="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="widgetId + '-evaluation-option-Intermediate'" class="option">Intermediate</label>
        <input
            class="selectopt"
            value="2"
            :name="widgetId"
            type="radio"
            :id="widgetId + '-evaluation-option-Advanced'"
            :checked="modelValue == 2"
            @click="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="widgetId + '-evaluation-option-Advanced'" class="option">Advanced</label>
    </div>
</template>

<script>
export default {
    name: 'RatingDropdown',
    props: [
        'modelValue',
        'widgetId'
    ]
}
</script>

<style>
.select {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 160px;
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
  background:#eee;
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