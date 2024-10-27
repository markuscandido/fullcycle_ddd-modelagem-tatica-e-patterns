import { Sequelize } from "sequelize-typescript";
import ProductModel from "../database/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepositorySequelize from "./product.repository.sequelize";


describe("Product Repository - Sequelize Tests", () => {
    let sequileze: Sequelize;
    beforeEach(async () =>{
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: {force: true}
        });

        sequileze.addModels([ProductModel]);
        await sequileze.sync();
    });
    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a product", async () =>{
        const productRepository = new ProductRepositorySequelize();
        const product = new Product("1", "Product One", 9.99);

        await productRepository.create(product);

        const productModel = await productRepository.findById("1");
        expect(productModel).toBeTruthy();
        expect(productModel?.id).toEqual(product.id);
        expect(productModel?.name).toEqual(product.name);
        expect(productModel?.price).toEqual(product.price);
    });

    it("should update a product", async () =>{
        const productRepository = new ProductRepositorySequelize();
        const product = new Product("1", "Product One", 9.99);
        
        await productRepository.create(product);
        const productModel = await productRepository.findById("1");
        
        product.changeName("Product One - Edited");
        product.changePrice(10.01);

        await productRepository.update(product);
        
        const productModel2 = await productRepository.findById("1");

        expect(productModel2).toBeTruthy();
        expect(productModel2?.id).toEqual(product.id);
        expect(productModel2?.name).toEqual(product.name);
        expect(productModel2?.price).toEqual(product.price);
    });

    it("should find a product by id", async () =>{
        const productRepository = new ProductRepositorySequelize();
        const product = new Product("1", "Product One", 9.99);
        
        await productRepository.create(product);
        
        const productModel = await productRepository.findById(product.id);
        
        expect(productModel).toBeTruthy();
        expect(productModel?.id).toEqual(product.id);
        expect(productModel?.name).toEqual(product.name);
        expect(productModel?.price).toEqual(product.price);
    });

    it("should throw error when product id not found", async () =>{
        const productRepository = new ProductRepositorySequelize();
        const product = new Product("1", "Product One", 9.99);
        
        await productRepository.create(product);
        
        await expect(productRepository.findById("999"))
            .rejects
            .toThrow("Product not found");
        
    });

    it("should find all product", async () =>{
        const productRepository = new ProductRepositorySequelize();

        const product1 = new Product("1", "Product One", 9.99);
        await productRepository.create(product1);

        const product2 = new Product("2", "Product Two", 19.99);
        await productRepository.create(product2);

        const product3 = new Product("3", "Product Three", 29.99);
        await productRepository.create(product3);

        const product4 = new Product("4", "Product Four", 39.99);
        await productRepository.create(product4);

        const product5 = new Product("5", "Product Five", 49.99);
        await productRepository.create(product5);
        
        
        const products = await productRepository.findAll();
        
        expect(products).toBeTruthy();
        expect(products.length).toEqual(5);
        
    });
});