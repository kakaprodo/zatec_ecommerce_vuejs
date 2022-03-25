import http from "./http-client";
import dateFormat from "dateformat";
import store from "../stores";
import StoreModules from "../stores/module-names";
import Mutations from "../stores/mutations";
import RouteName from "./route-names";

const Sh = {
  DISCOUNT_RULE_BETWEEN: "between",
  DISCOUNT_RULE_ABOVE_MAX: "above_max",
  saveAuthToken: async function (token) {
    await this.storageAdd("token", token);
    await this.setAuthUser(token);
  },
  /**
   * Set ot refresh the auth user
   * @returns
   */
  setAuthUser: async function () {
    const resp = await http.get("user");

    if (resp.status !== 200) return;

    const user = resp.data.data;

    this.storageAdd("user", JSON.stringify(user));

    store.commit({
      type: `${StoreModules.USER}/${Mutations.SET_AUTH_USER}`,
      user: user,
    });
  },
  getAuthUser: function (onExists = () => {}, onNotExists = () => {}) {
    let user = this.storageGet("user");

    user = user ? JSON.parse(user) : null;

    if (!user) return onNotExists();

    onExists(user);

    return user;
  },
  storageAdd: (key, value) => {
    localStorage.setItem(key, value);
  },
  storageGet: (key) => {
    return localStorage.getItem(key);
  },
  storageDelete: (key) => {
    return localStorage.removeItem(key);
  },
  logoutUser: function (routeNavigation) {
    this.storageDelete("token");
    this.storageDelete("user");
    store.commit(`${StoreModules.USER}/${Mutations.INITIALIZE}`);

    routeNavigation.push(RouteName.INDEX);
  },
  appBaseUlr: () => {
    return window.location.protocol + "//" + window.location.host;
  },
  dateFormat: (date, format = "mmm dS yyyy, h:MM TT") => {
    return dateFormat(date, format);
  },
  isEmpty: (value) => {
    if (!value) return true;

    return value.length === 0;
  },
  // Discount in percentage
  findDiscount: function (price, discountSettings = []) {
    const appropriateDiscount = discountSettings
      .filter((discount) => {
        const priceMatches = this.priceMatchDiscountRule(price, discount);

        return priceMatches;
      })
      .shift();

    return Number(appropriateDiscount?.value || 0);
  },
  priceMatchDiscountRule: function (price, discount = {}) {
    const minPrice = discount.min_price;
    const maxPrice = discount.max_price;

    return {
      [this.DISCOUNT_RULE_BETWEEN]: () => {
        if (price >= minPrice && price <= maxPrice) return true;

        return false;
      },
      [this.DISCOUNT_RULE_ABOVE_MAX]: () => {
        if (price > maxPrice) return true;

        return false;
      },
    }[discount.rule]();
  },
  redirectTo: (routeName) => {
    window.location.href = Sh.appBaseUlr() + routeName;
  },
  statusIsOk: (statusCode) => {
    return statusCode === 200 || statusCode === 201;
  },
};

export default Sh;
