import { getApi } from "./server.js";
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
                <img src="${
                  item.image
                }" alt="Product Image" class="w-full h-[180px] object-contain mb-4 hover:scale-110 transition-all duration-300 ease-out">
                <h3 class="text-[18px] font-bold text-brand mb-2 text-center h-[30px] overflow-hidden bg-white px-4">${
                  item.title
                }</h3>
                <span class="flex justify-center">
                    <svg width="125" height="16" viewBox="0 0 125 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M69.1422 6.26868L64.8907 9.79065L66.1415 15.5146L62.0105 12.0566L57.6135 15.3307L59.3123 9.67065L55.3462 5.9707L60.5267 5.93066L62.4733 0.369751L63.9765 6.00574L69.1422 6.26868Z"
                            fill="#FFC600" />
                        <path
                            d="M41.6913 6.26868L37.4398 9.79065L38.6906 15.5146L34.5596 12.0566L30.1626 15.3307L31.8613 9.67065L27.8953 5.9707L33.0757 5.93066L35.0224 0.369751L36.5256 6.00574L41.6913 6.26868Z"
                            fill="#FFC600" />
                        <path
                            d="M14.2423 6.26868L9.99082 9.79065L11.2416 15.5146L7.11061 12.0566L2.71358 15.3307L4.41237 9.67065L0.446289 5.9707L5.62675 5.93066L7.57341 0.369751L9.0766 6.00574L14.2423 6.26868Z"
                            fill="#FFC600" />
                       console.log(res);     <path
                            d="M96.5916 6.26868L92.3402 9.79065L93.591 15.5146L89.46 12.0566L85.063 15.3307L86.7618 9.67065L82.7957 5.9707L87.9762 5.93066L89.9228 0.369751L91.426 6.00574L96.5916 6.26868Z"
                            fill="#FFC600" />
                        <path
                            d="M124.043 6.26868L119.791 9.79065L121.042 15.5146L116.911 12.0566L112.514 15.3307L114.213 9.67065L110.247 5.9707L115.427 5.93066L117.374 0.369751L118.877 6.00574L124.043 6.26868Z"
                            fill="#C1C8CE" />
                    </svg>
                </span>
                <div class="flex gap-3 justify-center mt-3">
                    <!-- chegirmadagi narxi -->
                    <p class="text-cat mb-4 font-bold text-[18px]">  ${(
                      item.price * 0.75
                    ).toFixed(2)}</p>
                    <!-- asosiy narxi -->
                    <span class="line-through text-[14px] text-cat ">${
                      item.price
                    }</span>
                    <!-- chegirma foizi -->
                    <span class="font-bold text-[14px] text-red">-25% Off</span>
                </div>
                <div class="flex gap-3 px-4 items-end mt-auto">
                    <button data-id="${
                      item.id
                    }" class="bascketAd w-full bg-brand text-white py-2 rounded-md hover:bg-hovertext transition-colors">
                        Add to Cart
                    </button>
                    <button data-id="${item.id}"
                        class="likeAd w-full bg-red text-white py-2 rounded-md hover:bg-white transition-colors hover:text-red">Like</button>
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
