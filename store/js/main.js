const dom = (params) => {
    return document.querySelector(params);
}
let listSanPham = [];
getProduct();
function getProduct() {
    apiGetSanPham()
        .then((response) => {
            listSanPham = response.data;
            let sanPham = response.data.map((product) => {
                return new SanPham(product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.img,
                    product.desc,
                    product.type,
                    product.src)
            })
            display(sanPham);
        })
        .catch((error) => {
            console.log(error);
        })
}

setTimeout(() => {
    console.log(listSanPham);
}, 3000);

function display(sanPham) {
    let show = sanPham.reduce((result, sanpham) => {
        return result + `
        <div class="card">
            <div class="top-bar">
                <i class="fab fa-apple"></i>
            </div>
            <div class="img-container">
                <img class="product-img"
                    src="${sanpham.src}"
                    alt="">
                <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
            </div>
            <div class="details">
                <div class="name-fav">
                    <strong class="product-name">${sanpham.name}</strong>
                    <button onclick="/*this.classList.toggle(&quot;fav&quot;)*/" class="heart"><i
                            class="fas fa-heart"></i></button>
                </div>
                <div class="wrapper">
                    <p>${sanpham.screen}</p>
                    <p>Camera sau: ${sanpham.backCamera}</p>
                    <p>Camera trước: ${sanpham.frontCamera}</p>
                    <p>${sanpham.desc}</p>
                </div>
                <div class="purchase">
                    <p class="product-price">$ ${sanpham.price}</p>
                    <span class="btn-add">
                        <div>
                            <button class="add-btn" data-type="add" data-id="${sanpham.id}">
                                Add 
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        `
    }, "")
    dom(".main-cart").innerHTML = show;
}

cartDetails = [];

let quantity = 1;
localStorageCart();

// Lưu giỏ hàng vào localStorage
function localStorageCart() {
    cartDetails = JSON.parse(localStorage.getItem("cartData")) || [];
    cartDetails = cartDetails.map((cartData)=>{
        return new Cart(cartData.id,
            cartData.name,
            cartData.price,
            cartData.screen,
            cartData.backCamera,
            cartData.frontCamera,
            cartData.img,
            cartData.desc,
            cartData.type,
            cartData.src
            )
    })
    displayCart(cartDetails);
    sum(cartDetails);
}

// Thêm sản phẩm vào giỏ hàng (cartDetails)
dom(".main-cart").addEventListener("click", (evt) => {
    let id = evt.target.getAttribute("data-id");
    let btn = evt.target.getAttribute("data-type");
    let sp = listSanPham.find((sanPham) => {
        return id === sanPham.id;
    })
    let cartItem = {
        product: {
            id: sp.id,
            name: sp.name,
            price: sp.price,
            screen: sp.screen,
            backCamera: sp.backCamera,
            frontCamera: sp.frontCamera,
            img: sp.img,
            desc: sp.desc,
            type: sp.type,
            src: sp.src
        },
        quantity: 1,
    }
    if (btn === "add") {
        cartDetails.push(sp);
    }
    localStorage.setItem("cartData", JSON.stringify(cartDetails));
    displayCart(cartDetails);
    sum(cartDetails);
})

// Lắng nghe sự kiện hiển thị trang giỏ hàng
dom(".nav").addEventListener("click", (evt) => {
    console.log(evt.target);
    dom(".cover").style.display = "block";
    dom(".side-nav").style.right = "0%";
})

// Lắng nghe sự kiện đóng trang giỏ hàng
dom(".cart .side-nav button").addEventListener("click", (evt) => {
    console.log(evt.target);
    dom(".cover").style.display = "none";
    dom(".side-nav").style.right = "-100%";
})

// Xóa 1 sản phẩm trong danh sách giỏ hàng (cartDetails)
dom(".cart-items").addEventListener("click", (evt) => {
    let delTrash = evt.target.getAttribute("data-type");
    id = evt.target.getAttribute("data-id");
    if (delTrash === "deleteTrash") {
        for (let i in cartDetails) {
            if (id === cartDetails[i].id) {
                cartDetails.splice(i, 1);
                break;
            }
        }
    }
    localStorage.setItem("cartData", JSON.stringify(cartDetails));
    displayCart(cartDetails);
    sum(cartDetails);
});

// Xóa toàn bộ giỏ hàng
dom(".final").addEventListener("click", (evt) => {
    console.log(evt.target);
    let count = 0;
    if(evt.target.getAttribute("class") === "btn clear"){
        for(let i in cartDetails) {
            count++;
        }  
        cartDetails.splice(0, count);
        localStorage.setItem("cartData", JSON.stringify(cartDetails));
    }
    displayCart(cartDetails);
    sum(cartDetails);
})

// Hiển thị danh sách sản phẩm trong giỏ hàng
function displayCart(cartDetails) {
    let showCart = cartDetails.reduce((result, cartItem) => {
        return result + `
        <div class="cart-item">
            <div class="cart-img">
                <img src="${cartItem.src}" alt="">
            </div>
            <strong class="name">${cartItem.name}</strong>
            <span class="qty-change">
            <div>
                <button class="btn-qty" onclick="qtyChange(this,'sub')"><i class="fas fa-chevron-left"></i></button>
                <p class="qty">1</p>
                <button class="btn-qty" onclick="qtyChange(this,'add')"><i class="fas fa-chevron-right"></i></button>
            </div></span>
            <p class="price">$ ${cartItem.price}</p>
            <button data-type="delete">
                <i class="fas fa-trash" data-type="deleteTrash" data-id="${cartItem.id}"></i>
            </button>
        </div>
        `
    }, "")
    dom(".cart-items").innerHTML = showCart;
}

function sum(cartDetails){
    let sum = 0;
    let count = 0;
    for(let i in cartDetails){
        sum += cartDetails[i].price*1;
        count++;
    }
    dom(".total").innerText = sum;
    dom(".total-qty").innerText = count;
}

