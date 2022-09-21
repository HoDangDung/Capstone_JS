// Khai báo đối tượng sản phẩm
function Cart(id, name, price, screen, backCamera, frontCamera, img, desc, type, src) {
    //Thuộc tính
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.src = src;
}