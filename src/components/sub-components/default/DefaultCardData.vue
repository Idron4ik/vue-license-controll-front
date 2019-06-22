<template>
  <li class="products-card__item">
    <div v-for="(item, index) in data" :key="index">
      <template v-if="item.text.toLowerCase() === 'title'" class="align-end">
        <div class="products-card__title">{{ props.item[item.text.toLowerCase()] }}</div>
      </template>
      <template v-if="item.text.toLowerCase() === 'description'" class="align-end">
        <div class="products-card__description">{{ props.item[item.text.toLowerCase()] }}</div>
      </template>
      <template v-if="item.text.toLowerCase() === 'status'" class="align-end">
        <div class="products-card__status">
          <v-chip
            :color="
              props.item.status === 'PENDING' ? 'grey' : 
              (props.item.status === 'REJECTED') ? 'red' : 
              'red'
            "
            :text-color="
              props.item.status === 'PENDING' ? 'black' : 
              'white'"
          >{{ props.item.status }}</v-chip>
          <div class="products-card__icon">
            <v-icon large>
              {{
              props.item.status === 'PENDING' ? 'cached' :
              (props.item.status === 'REJECTED') ? 'block' :
              (props.item.status === 'SCRIPT_WORKING') ? 'settings_input_svideo' :
              (props.item.status === 'WAITING_FOR_PAYMENT') ? 'check' :
              (props.item.status === 'PAYED') ? 'business_center' : false
              }}
            </v-icon>
          </div>
        </div>
      </template>
    </div>
  </li>
</template>

<script>
export default {
  name: "defaultCardDate",

  props: {
    data: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
</style>