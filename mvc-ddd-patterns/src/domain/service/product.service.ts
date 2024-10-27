import Product from "../entity/product";

export default class ProductService{

    static increasePrice(products: Product[], percentage: number): Product[]{
        if(percentage <= 0){
            throw new Error("Percentage of increase must be greater than zero");
        }

        if (!products || products.length === 0) {
            throw new Error("Products list cannot be null or empty");
        }
        products.forEach(product => {
            const productPriceActual = product.price;
            const newPrice = Math.floor((productPriceActual + (productPriceActual * (percentage / 100))) * 100) / 100;
            product.changePrice(newPrice);
        });
        return products;
    }

}