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
            :color="itemElem.status === 'PENDING' ? 'grey' :
              (itemElem.status === 'REJECTED') ? 'red' :
              (itemElem.status === 'SCRIPT_WORKING') ? 'teal' :
              (itemElem.status === 'WAITING_FOR_PAYMENT') ? 'orange' :
              (itemElem.status === 'WAITING_FOR_RESULTS_REVIEW') ? 'primary' :
              (itemElem.status === 'PAYED') ? 'green' : false"
            :text-color="
              itemElem.status === 'PENDING' ? 'white' :
              (itemElem.status === 'REJECTED') ? 'white' :
              (itemElem.status === 'SCRIPT_WORKING') ? 'white' :
              (itemElem.status === 'WAITING_FOR_PAYMENT') ? 'white' :
              (itemElem.status === 'WAITING_FOR_RESULTS_REVIEW') ? 'white' :
              (itemElem.status === 'PAYED') ? 'white' : false "
          >{{ 

            itemElem.status === 'PENDING' ? 'Очікується перевірки адміністратором' :
              (itemElem.status === 'REJECTED') ? 'Відмовлено адміністратором' :
              (itemElem.status === 'SCRIPT_WORKING') ? 'Опрацювання' :
              (itemElem.status === 'WAITING_FOR_PAYMENT') ? 'Очікується оплата користувачем' :
              (itemElem.status === 'WAITING_FOR_RESULTS_REVIEW') ? 'В процесі перевірки адміністратором' :
              (itemElem.status === 'PAYED') ? 'Оплачено та передано на опрацювання виконавцеві' : false
           }}</v-chip>
          <div class="products-card__icon">
            <v-icon large
              :color="itemElem.status === 'PENDING' ? 'grey' :
              (itemElem.status === 'REJECTED') ? 'red' :
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