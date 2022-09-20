function apiGetSanPham(searchProduct){
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/Capstone_JS`,
        method: "GET",
        params:{
            name: searchProduct,
        }
    })
}

function apiEditSanPham(productID){
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/Capstone_JS/${productID}`,
        method: "GET",
    })
}

function apiAddSanPham(product){
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/Capstone_JS`,
        method: "POST",
        data: product,
    })
}

function apiDeleteSanPham(productID){
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/Capstone_JS/${productID}`,
        method: "DELETE",
    })
}

function apiUpdateSanPham(productID, product){
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/Capstone_JS/${productID}`,
        method: "PUT",
        data: product,
    })
}