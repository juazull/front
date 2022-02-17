<template>
    <span
        class="lds-ring"
        :class="{
            'lds-ring-small': size === 'small'
        }"
    >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </span>
</template>

<script>
export default {
    name: 'BaseLoader',
    props: {
        size: {
            type: String,
            default: 'normal',
            validator: function(value) {
                return ['normal', 'small'].includes(value);
            }
        }
    }
}
</script>
