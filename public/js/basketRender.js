const megaSaleNone = document.querySelector(".megaSaleNone");
const bannerNone = document.querySelector(".bannerNone");
const openBasket = document.querySelector(".openBasket");
const bannerOpen = document.querySelector(".bannerOpen")
const renderBasket = document.querySelector("#renderBasket")
import { getStorage, setStorage } from "./storage.js";
const itemLike = document.querySelector("#itemLike")

const basketArr = getStorage("basket") || [];
const likeArr = getStorage("wishlist") || [];

function choiseArr(list) {
    bannerNone.classList.add("hidden");
    megaSaleNone.classList.add("hidden");
    bannerOpen.classList.remove("invisible", "hidden")

    if (list.length <= 0) {
        document.querySelector(".arrLength").classList.remove("hidden");
    };
    renderArr(list)
}

itemLike.addEventListener("click", (e) => {
    choiseArr(likeArr);
})
openBasket.addEventListener("click", (e) => {
    choiseArr(basketArr);
})

function renderArr(data) {
    renderBasket.innerHTML = data.map(el => {
        return `
     <div class="flex justify-between flex-nowrap w-full  h-[90px] gap-3 px-3 py-3 border-2  border-hovertext">
                <img src="${el.image}" alt="">
                <div class="flex-col justify-between">
                    <span class="text-[16px]  text-textWhite">${truncateWords(el.title, 3)}</span>
                    <p class="text-[16px]  text-textWhite">${truncateWords(el.description, 3)}</p>
                </div>
                <div class="flex-col">
                    <div class="flex h-fit rounded-md  p-[1px]" id="incdec">
                        <span class="bg-rose-500 py-1 px-1 rounded-sm cursor-pointer h-fit decrement" data-id="${el.id}">-</span>
                        <input type="text"  placeholder="${el.counts}"
                            class="w-8 py-1 px-1  cursor-pointer h-fit outline-none flex justify-center items-center">
                        <span class="bg-rose-500 py-1 px-1 rounded-sm cursor-pointer h-fit increment" data-id="${el.id}">+</span>
                    </div>
                    <span class="inline-block mt-2">${el.price * el.counts
            } $</span >
                </div >
            </div >
    `
    }).join("")
}

renderBasket.addEventListener("click", (e) => {
    const decrement = e.target.closest(".decrement");
    const increment = e.target.closest(".increment");
    const id = Number(e.target.dataset.id);

    const index = basketArr.findIndex((el) => el.id === id);

    if (index !== -1) {
        if (increment) {
            basketArr[index].counts = (basketArr[index].counts || 1) + 1;
        }
        if (decrement) {
            basketArr[index].counts = Math.max(1, (basketArr[index].counts || 1) - 1);
        }
        console.log(basketArr);
        setStorage("basket", basketArr);
        renderArr(basketArr)
    }
})


function truncateWords(str, wordCount) {
    return str.split(" ").slice(0, wordCount).join(" ");
}


document.querySelector("#closeBtn").addEventListener("click", () => {
    bannerNone.classList.remove("hidden");
    megaSaleNone.classList.remove("hidden", "invisible");
    bannerOpen.classList.add("invisible", "hidden")
})

function formatPrice(value) {
    return `$ ${value.toFixed(2)}`;
};