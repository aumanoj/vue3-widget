<template>
  <div class="singleTicketTotalAmount">
    <div class="collapse" @click="toggle()">
      <div class="collapseInner"></div>
    </div>
    <div class="expand d-flex" v-show="toggleButton">
      <TotalTicketCalculation />
      <div class="labelBtn">
        <BackButton :message="'back'" class="button btnBlack" />
      </div>
    </div>
  </div>
  <div class="cardBodyWrapper cart" id="custom-target">
    <div class="eventDiscountWrapper">
      <h1>{{ $t("cartTemp.cart") }}</h1>
      <div class="amountWrapper">
        <p>
          {{ totalQuantity }} {{ $t("cartTemp.tickets") }}
          <span>{{ ticketPrice.toFixed(2) }} {{ currency }}</span>
        </p>
        <p>
          {{ $t("cartTemp.fees") }} <span>0.00 {{ currency }}</span>
        </p>
        <p v-if="ticketDiscountPrice">
          Discount <span>{{ ticketDiscountPrice.toFixed(2) }} {{ currency }}</span>
        </p>
      </div>
      <div class="amountWrapper">
        <p>
          {{ $t("cartTemp.subtotal") }}
          <span>{{ totalPrice.toFixed(2) }} {{ currency }}</span>
        </p>
        <p>
          {{ $t("cartTemp.tax") }} (0%) <span>0.00 {{ currency }}</span>
        </p>
      </div>
      <div class="totalAmountWrapper">
        <p>
          {{ $t("cartTemp.total") }}
          <span>{{ totalPrice.toFixed(2) }} {{ currency }}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="bodyScroll cartpage">
    <div class="cardBodyWrapper">
      <div class="ticketWrapper">
        <div class="ticketCategory d-flex" v-for="item in cart.cartItems" :key="item.id">
          <div class="detailsCol">
            <h2>{{ item.name }}</h2>
            <p v-for="disc in item.discounts" :key="disc.id">
              {{ disc.name }}
            </p>
            <div class="priceWrap">
              <h6>{{ item.totalPrice.toFixed(2) }} {{ item.currency }}</h6>
            </div>
          </div>
          <div class="collapseArrow redBg" @click="removeFromCart(item)">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cardBodyWrapper">
    <div class="footerActionBtn">
      <button
        class="button btnBlack"
        :class="totalQuantity == 0 ? 'disabled' : ''"
        :disabled="totalQuantity == 0"
        @click="checkout"
      >
        {{ $t("cartTemp.checkout") }}
      </button>
    </div>
    <div class="sloganText">
      <p>{{ $t("cartTemp.msg") }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TotalTicketCalculation from "./TotalTicketCalculation";
import BackButton from "../backButton/BackButton";
export default {
  name: "Cart",
  components: {
    TotalTicketCalculation,
    BackButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toggleButton = ref(true);
    let cart = computed(function () {
      return store.state.cart;
    });

    let ticketPrice = computed(() => {
      let ticketPrice = 0;
      cart.value.cartItems.forEach((element) => {
        ticketPrice += element.totalPrice;
      });
      return ticketPrice;
    });

    let ticketDiscountPrice = computed(() => {
      let ticketPrice = 0;
      cart.value.cartItems.forEach((element) => {
        ticketPrice += element.totalDiscount;
      });
      return ticketPrice;
    });

    let event = computed(() => {
      return store.state.event;
    });

    let currency = computed(() => {
      let currency = 0;
      cart.value.cartItems.forEach((element) => {
        currency = element.currency;
      });
      return currency;
    });

    const totalPrice = computed(() => {
      return store.state.cart.itemTotalAmount;
    });

    const totalQuantity = computed(() => {
      return store.state.cart.itemsTotalQuantity;
    });

    function removeFromCart(item, complete = true) {
      if (complete) {
        store.commit("removeCartItemComplete", item);
      } else {
        store.commit("removeCartItem", item);
      }
    }

    function checkout() {
      router.push({
        path: "/delivery-method",
      });
    }

      function toggle(){
            return toggleButton.value=!toggleButton.value
      }

    return {
      cart,
      totalPrice,
      totalQuantity,
      removeFromCart,
      currency,
      event,
      checkout,
      ticketPrice,
      ticketDiscountPrice,
      toggleButton,
      toggle
    };
  },
};
</script>
