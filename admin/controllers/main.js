// ========= Helper Function ===========
const dom = (params) => {
    return document.querySelector(params);
}
// =====================================

getProducts();
// function getProducts request API để lấy danh sách sản phẩm
function getProducts(searchProduct) {
    apiGetSanPham(searchProduct)
        .then((response) => {
            let products = response.data.map((product) => {
                return new SanPham(product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.img,
                    product.desc,
                    product.type)
            });
            // Hiển thị danh sách sản phẩm
            console.log(products);
            display(products);
        })
        .catch((error) => {
            console.log(error);
        });
}

// function addProduct request API để lấy danh sách sản phẩm 
function addProduct(product) {
    apiAddSanPham(product)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        });
}

// function deleteProduct request API để xóa sản phẩm trong danh sách
function deleteProduct(productID) {
    apiDeleteSanPham(productID)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        })
}

// function updateProduct request API để cập nhật sản phẩm 
function updateProduct(productID, product) {
    apiUpdateSanPham(productID, product)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        })
}

// Hiển thị danh sách ra màn hình
function display(products) {
    let html = products.reduce((result, sanpham, index) => {
        return result + `
        <tr>
            <td>${index + 1}</td>
            <td>${sanpham.name}</td>
            <td>$ ${sanpham.price}</td>
            <td>
                <img src="${sanpham.img}" alt="" style="width:100px">
            </td>
            <td>${sanpham.desc}</td>
            <td>${sanpham.type}</td>
            <td>
                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="edit" data-id="${sanpham.id}">Edit</button>
                <button class="btn btn-danger" data-type="delete" data-id="${sanpham.id}">Delete</button>
            </td>
        </tr>       
        `
    }, "")
    dom("#tblDanhSachSP").innerHTML = html;
}

// btn thêm mới sản phẩm
dom("#btnThemSP").addEventListener("click", () => {
    dom(".modal-title").innerHTML = "Thêm sản phẩm"
    dom(".modal-footer").innerHTML = `
        <button class="btn btn-primary" data-type="add">Thêm</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
    `
    resetForm();
})

dom(".modal-footer").addEventListener("click", (evt) => {
    let elementType = evt.target.getAttribute("data-type");

    let id = dom("#MaSP").value,
        name = dom("#TenSP").value,
        price = dom("#GiaSP").value * 1,
        screen = dom("#Screen").value,
        backCamera = dom("#BackCamera").value,
        frontCamera = dom("#FrontCamera").value,
        img = dom("#jpg").value,
        desc = dom("#MoTa").value,
        type = dom("#Type").value;
        src = dom("#png").value;

    const product = new SanPham(null, name, price, screen, backCamera, frontCamera, img, desc, type,src);

    if (elementType === "add") {
        addProduct(product);
        resetForm();
    }

    if (elementType === "update") {
        updateProduct(id, product);
        resetForm();
    }
})

dom("#tblDanhSachSP").addEventListener("click", (evt) => {
    let id = evt.target.getAttribute("data-id");
    let elementType = evt.target.getAttribute("data-type");

    if (elementType === "delete") {
        deleteProduct(id);
    }

    if (elementType === "edit") {
        dom(".modal-title").innerHTML = "Cập nhật sản phẩm";
        dom(".modal-footer").innerHTML = `
            <button class="btn btn-primary" data-type="update">Cập nhật</button>
            <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `;

        apiEditSanPham(id)
            .then((response) => {
                dom("#MaSP").value = response.data.id;
                dom("#TenSP").value = response.data.name;
                dom("#GiaSP").value = response.data.price;
                dom("#Screen").value = response.data.screen;
                dom("#BackCamera").value = response.data.backCamera;
                dom("#FrontCamera").value = response.data.frontCamera;
                dom("#jpg").value = response.data.img;
                dom("#png").value = response.data.src;
                dom("#MoTa").value = response.data.desc;
                dom("#Type").value = response.data.type;
            })
            .catch((error) => {
                console.log(error);
            });
    }
})

function resetForm() {
    dom("#TenSP").value = "";
    dom("#GiaSP").value = "";
    dom("#Screen").value = "";
    dom("#BackCamera").value = "";
    dom("#FrontCamera").value = "";
    dom("#jpg").value = "";
    dom("#png").value = "";
    dom("#MoTa").value = "";
    dom("#Type").value = "Chọn hãng điện thoại";
}

    dom("#inputTK").addEventListener("keydown", (evt) => {
        console.log(evt.key);
      if(evt.key !== "Enter")  {
        return;
      }
      getProducts(evt.target.value);
    })