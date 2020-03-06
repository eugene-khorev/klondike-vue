<template>
  <div class="stock-area">
    <Stock/>
  </div>
</template>

<script>
import Stock from '@/components/Stock.vue';
import "@/styles/StockArea.scss";

export default {
  components: {Stock},
}
</script>
