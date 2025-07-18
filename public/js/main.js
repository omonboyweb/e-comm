import { getApi } from "./server.js";
import { starRender } from "./starRender.js";
const products = document.querySelector("#products");
const tab = document.querySelector("#tab");
const tabItem = document.querySelectorAll("#tabItem");

tab.addEventListener("click", (e) => {
  const target = e.target.dataset.path;
  const targetClass = e.target.closest("#tabItem");
  tabItem.forEach((el) => el.classList.remove("text-hovertext"));
  targetClass.classList.add("text-hovertext");
  if (!target) return;
  if (target === "products") {
    getData("products");
  } else if (
    ["women's clothing", "men's clothing", "jewelery", "electronics"].includes(
      target
    )
  ) {
    getData("products/category", target);
  }
});
getData("products");

function innerData(data) {
  products.innerHTML = data
    .map((item) => {
      return `
     <div class="relative bg-white flex flex-col justify-between rounded-lg shadow-md pb-[15px] h-[350px] ">
                <img src="${item.image
        }" alt="Product Image" class="w-full h-[180px] object-contain mb-4 hover:scale-110 transition-all duration-300 ease-out">
                <h3 class="text-[18px] font-bold text-brand mb-2 text-center h-[30px] overflow-hidden bg-white px-4">${item.title
        }</h3>
                <span class="flex justify-center h-4">
                  ${starRender(item.rating.rate)}
                </span>
                <div class="flex gap-3 justify-center mt-3">
                    <!-- chegirmadagi narxi -->
                    <p class="text-cat mb-4 font-bold text-[18px]">  ${(
          item.price * 0.75
        ).toFixed(2)}</p>
                    <!-- asosiy narxi -->
                    <span class="line-through text-[14px] text-cat ">${item.price
        }</span>
                    <!-- chegirma foizi -->
                    <span class="font-bold text-[14px] text-red">-25% Off</span>
                </div>
                <div class="flex gap-3 px-4 items-end mt-auto">
                    <button data-id="${item.id}" class="basket w-full bg-brand text-white py-2 px-2 text-[14px] rounded-md hover:bg-hovertext transition-colors">
                        Add to Cart
                    </button>
                    <button data-id="${item.id}"
                        class="likeAd w-full bg-red text-white py-2 px-2 text-[14px] rounded-md hover:bg-white transition-colors hover:text-red">Like</button>
                </div>
            </div>
    `;
    })
    .join("");
}
async function getData(path, path2) {
  try {
    const res = await getApi(path, path2);
    innerData(res);
  } catch (error) {
    console.log(error);
  }
}

