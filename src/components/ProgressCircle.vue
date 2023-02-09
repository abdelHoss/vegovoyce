<template>
      <div>
      <va-progress-circle
        class="progress-circle"
        :thickness="0.3"
        indeterminate
        color="secondary"
        size="120px"
      />
    </div>
</template>

<script>
export default {
name: "ProgressCircle"
}
</script>

<style>

.progress-circle {
  margin: 20px auto 0;
}

</style>