<template>
  <li class="products-card__item">
    <div 
      class="products-card__item-data" 
      v-for="(item, index) in header" 
      :key="index"
    >
      <template v-if="item.text.toLowerCase() === 'title'" class="align-end">
        <div class="products-card__title">{{ itemElem[item.text.toLowerCase()] }}</div>
      </template>
      <template v-if="item.text.toLowerCase() === 'description'" class="align-end">
        <div class="products-card__description">{{ itemElem[item.text.toLowerCase()] }}</div>
      </template>
      <template v-if="item.text.toLowerCase() === 'status'" class="align-end">
        <div class="products-card__status">
          <v-chip
            :color="
              itemElem.status === 'PENDING' ? 'grey' : 
              (itemElem.status === 'REJECTED') ? 'red' : 
              'red'
            "
            :text-color="
              itemElem.status === 'PENDING' ? 'black' : 
              'white'"
          >{{ itemElem.status }}</v-chip>
          <div class="products-card__icon">
            <v-icon large
              :color="itemElem.status === 'PENDING' ? 'grey' :
              (itemElem.status === 'REJECTED') ? 'block' :
              (itemElem.status === 'SCRIPT_WORKING') ? 'teal' :
              (itemElem.status === 'WAITING_FOR_PAYMENT') ? 'orange' :
              (itemElem.status === 'WAITING_FOR_RESULTS_REVIEW') ? 'primary' :
              (itemElem.status === 'PAYED') ? 'green' : false"
            >
              {{
                itemElem.status === 'PENDING' ? 'cached' :
                (itemElem.status === 'REJECTED') ? 'block' :
                (itemElem.status === 'SCRIPT_WORKING') ? 'settings_input_svideo' :
                (itemElem.status === 'WAITING_FOR_PAYMENT') ? 'check' :
                (itemElem.status === 'WAITING_FOR_RESULTS_REVIEW') ? 'visibility' :
                (itemElem.status === 'PAYED') ? 'business_center' : false
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
    header:{
      type: Array
    },
    itemElem:{
    }
  }
};
</script>

<style lang="scss" scoped>
</style>