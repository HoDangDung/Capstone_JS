function validateName() {
    if (dom("#TenSP").value === "") {
        dom("#spanName").innerHTML = "Tên sản phẩm không được để trống";
        return false;
    }
    dom("#spanName").innerHTML = "";
    return true;
}

function validatePrice() {
    if (dom("#GiaSP").value === "") {
        dom("#spanGia").innerHTML = "Giá sản phẩm không được để trống";
        return false;
    }

    let regex = /[^\d]/g;
    if (regex.test(dom("#GiaSP").value)) {
        dom("#spanGia").innerHTML = "Giá sản phẩm phải là ký tự số";
        return false;
    }
    dom("#spanGia").innerHTML = "";
    return true;
}

function validateFrCame() {
    if (dom("#FrontCamera").value === "") {
        dom("#spanFrCame").innerHTML = "Thông tin camera trước sản phẩm không được để trống";
        return false;
    }
    dom("#spanFrCame").innerHTML = "";
    return true;
}

function validateBaCame() {
    if (dom("#BackCamera").value === "") {
        dom("#BackCamera").innerHTML = "Thông tin camera sau sản phẩm không được để trống";
        return false;
    }
    dom("#BackCamera").innerHTML = "";
    return true;
}

function validateImgJPG() {
    if (dom("#jpg").value === "") {
        dom("#spanImgJPG").innerHTML = "Hình .jpg sản phẩm không được để trống";
        return false;
    }
    dom("#spanImgJPG").innerHTML = "";
    return true;
}

function validateImgPNG() {
    if (dom("#png").value === "") {
        dom("#spanImgPNG").innerHTML = "Hình .png sản phẩm không được để trống";
        return false;
    }
    dom("#spanImgPNG").innerHTML = "";
    return true;
}

function validateDesc() {
    if (dom("#MoTa").value === "") {
        dom("#spanDesc").innerHTML = "Mô tả sản phẩm không được để trống";
        return false;
    }
    if (length > 61) {
        dom("#spanDesc").innerHTML = `Mô tả không được quá 60 ký tự(${length})`;
        return false;
    }
    dom("#spanDesc").innerHTML = "";
    return true;
}

function validateType() {
    if (dom("#Type").value === "Chọn hãng điện thoại") {
        dom("#spanHang").innerHTML = "Hãng không được để trống";
        return false;
    }
    dom("#spanHang").innerHTML = "";
    return true;
}

function validateForm() {
    let valid = true;
    valid = validateName() & validatePrice() & validateFrCame() & validateBaCame() & validateImgJPG() & validateImgPNG() & validateDesc() & validateType();
    if (!valid) {
        return false;
    }
    return true;
}