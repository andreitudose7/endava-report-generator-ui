<template>
    <div class="rating-faces">
        <div class="rating-group">
            <input
                class="rating__input rating__input--none"
                :name="widgetId"
                :id="'1st-rating-' + widgetId"
                value="-1"
                type="radio"
                :checked="modelValue == -1"
                @click="$emit('update:modelValue', $event.target.value)"
            />
            <label
                aria-label="Not evaluated"
                :class="{
                    'rating__label': true,
                    'active': modelValue == -1
                }"
                :for="'1st-rating-' + widgetId"
            >
                <i class="rating__icon rating__icon--none fa fa-ban"></i>
            </label>
            <input
                class="rating__input"
                :name="widgetId"
                :id="'2nd-rating-' + widgetId"
                value="0"
                type="radio"
                :checked="modelValue == 0"
                @click="$emit('update:modelValue', $event.target.value)"
            />
            <label
                aria-label="None"
                :class="{
                    'rating__label': true,
                    'active': modelValue == 0
                }"
                :for="'2nd-rating-' + widgetId"
            >
                <i class="rating__icon rating__icon--star fa fa-frown"></i>
            </label>
            <input
                class="rating__input"
                :name="widgetId"
                :id="'3rd-rating-' + widgetId"
                value="1"
                type="radio"
                :checked="modelValue == 1"
                @click="$emit('update:modelValue', $event.target.value)"
            />
            <label
                aria-label="Beginner"
                :class="{
                    'rating__label': true,
                    'active': modelValue == 1
                }"
                :for="'3rd-rating-' + widgetId"
            >
                <i class="rating__icon rating__icon--star fa fa-meh"></i>
            </label>
            <input
                class="rating__input"
                :name="widgetId"
                :id="'4th-rating-' + widgetId"
                value="2"
                type="radio"
                :checked="modelValue == 2"
                @click="$emit('update:modelValue', $event.target.value)"
            />
            <label
                aria-label="Intermediate"
                :class="{
                    'rating__label': true,
                    'active': modelValue == 2
                }"
                :for="'4th-rating-' + widgetId"
            >
                <i class="rating__icon rating__icon--star fa fa-grin-alt"></i>
            </label>
            <input
                class="rating__input"
                :name="widgetId"
                :id="'5th-rating-' + widgetId"
                value="3"
                type="radio"
                :checked="modelValue == 3"
                @click="$emit('update:modelValue', $event.target.value)"
            />
            <label
                aria-label="Advanced"
                :class="{
                    'rating__label': true,
                    'active': modelValue == 3
                }"
                :for="'5th-rating-' + widgetId"
            >
                <i class="rating__icon rating__icon--star fa far fa-grin-wink"></i>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RatingFaces',
    props: [
        'widgetId',
        'categoryIndex', 
        'checkpointIndex', 
        'modelValue'
    ]
}
</script>

<style>
/* * Pure CSS star rating that works without reversing order * of inputs * ------------------------------------------------------- * NOTE: For the styling to work, there needs to be a radio * input selected by default. There also needs to be a * radio input before the first star, regardless of * whether you offer a 'no rating' or 0 stars option * * This codepen uses FontAwesome icons */ 
.rating-faces .rating-group {
	display: inline-flex;
}
.rating-faces .rating__icon {
	pointer-events: none;
}
.rating-faces .rating__input {
	display: none;
}
.rating-faces .rating__label {
	cursor: pointer;
	padding: 0 0.1em;
	font-size: 2rem;
}

/* by default, the first radio - the one that is not star - should be gray - not selected */
.rating-faces .rating__icon--none {
	color: #eee;
}
/* if the first radio - the one that is not star - is checked, then should be red */
.rating-faces .rating__input--none:checked + .rating__label .rating__icon--none {
	color: red;
}
/* the default for the stars */
.rating-faces .rating__icon--star {
	color: #eee;
}
.rating-faces .rating__label:hover {
  transition-duration: 0.2s;
  transform: scale(1.2);
}
.rating-faces .rating__input--none:hover + .rating__label .rating__icon--none {
	color: red;
}
.rating-faces .rating__label.active .rating__icon--none {
	color: red !important;
}
.rating-faces .rating__label[aria-label="None"].active .rating__icon--star {
	color: #ff3838 !important;
}
.rating-faces .rating__label[aria-label="Beginner"].active .rating__icon--star {
	color: #ebe800 !important;
}
.rating-faces .rating__label[aria-label="Intermediate"].active .rating__icon--star {
	color: #6eff1d !important;
}
.rating-faces .rating__label[aria-label="Advanced"].active .rating__icon--star {
	color: #2dccff !important;
} 
</style>