import {promises as fs} from "fs"

class ProductManager {
    constructor(){
        this.path ="./productos.txt";
        this.products = [];

        fs.access(this.path)
        .catch(() => fs.writeFile(this.path, "[]"))
        .catch((error) => console.error("Error al crear el archivo productos.txt:", error));
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
       
        ProductManager.id++;

       let newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id
       };

        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProduct = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8");
        return JSON.parse(respuesta);
    }

    getProducts = async() => {
        let respuesta2 = await this.readProduct();
        return console.log(respuesta2);
    };

    getProductById = async (id) => {
        let respuesta3 = await this.readProduct();
        if(!respuesta3.find(product => product.id === id)){
            console.log("Lo sentimos, no pudimos encontrar el producto")
        } else {
            console.log(respuesta3.find(product => product.id === id))
        };
    };

    deleteProductById = async (id) => {
        let respuesta4 = await this.readProduct();
        let productFilter = respuesta4.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
    };

    updateProduct = async ({id, ...producto}) => {
        await this.deleteProductById(id);
        let remainingProducts = await this.readProduct();
        let updatedProducts = [...remainingProducts, {id, ...producto}];
        await fs.writeFile(this.path, JSON.stringify(updatedProducts));
    };
};

const productos = new ProductManager;

productos.addProduct ('Remera', 'Zara, talle XL, blanca', 2500 , 'sin imagen', 'rem43', 16 );
productos.addProduct ('Remera', 'UnderWave, talle L, negra', 2200 , 'sin imagen', 'rem24', 4 );
productos.addProduct ('Buzo', 'GAP, talle M, azul', 6400, 'sin imagen', 'buz7', 8 );
productos.addProduct ('Buzo', 'Reef, talle S, rosa', 4400, 'sin imagen', 'buz19', 3 );
productos.addProduct ('Pantalón', 'Levis, talle 28, blanco', 14300, 'sin imagen', 'pan4', 17 );
productos.addProduct ('Zapatillas', 'Adidas, talle 40, blancas', 17000, 'sin imagen', 'zap31', 9 )

productos.getProducts(); 

productos.getProductById(4);

productos.deleteProductById(2);

productos.updateProduct({
    title: "TituloModificado",
    description: "DescripModificada",
    price: 9090,
    thumbnail: "ImgModificada",
    code: "CodigoModificado",
    stock: 9090,
    id: 3,
});