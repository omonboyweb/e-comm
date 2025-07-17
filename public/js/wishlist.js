const products = document.querySelector("#products");
import { getStorage, setStorage } from "./storage.js";
import { getApi } from "./server.js";
let wishlist = getStorage("wishlist") || [];
let basketArr = getStorage("basket") || [];

async function optimalFunc(id, list, storeArr) {
  const index = list.findIndex((el) => el.id === id);
  if (index !== -1) {
    list.splice(index, 1);
  } else {
    const getId = await getApi("products", id);
    list.push(getId);
  }
  setStorage(storeArr, list);
}

products.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  const likeBtn = e.target.closest(".likeAd");
  const basket = e.target.closest(".basket");
  if (likeBtn) {
    optimalFunc(id, wishlist, "wishlist");
  } else if (basket) {
    optimalFunc(id, basketArr, "basket");
  }
});
