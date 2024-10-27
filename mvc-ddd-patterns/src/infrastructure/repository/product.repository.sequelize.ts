import Product from "../../domain/entity/product";
import IProductRepository from "../../domain/repository/product.repository.interface";
import ProductModel from "../database/sequelize/model/product.model";

export default class ProductRepositorySequelize implements IProductRepository{
    
    async create(entity: Product): Promise<void> {
        await ProductModel.create(this.toPersistenceObject(entity));
    }
    async update(entity: Product): Promise<void> {
        const { id, ...entityData } = this.toPersistenceObject(entity);
        await ProductModel.update(entityData, {where: {id: entity.id}});
    }

    async findById(id: string): Promise<Product> {
        const productModel = await ProductModel.findByPk(id);
        if(productModel == null){
            throw new Error("Product not found");
        }
        return new Product(
            productModel?.id,
            productModel?.name,
            productModel?.price
        )
    }
    
    async findAll(): Promise<Product[]> {
        const productsModelList = await ProductModel.findAll();
        
        // Mapeia cada productModel para um Product
        const productsList: Product[] = productsModelList.map(productModel => {
            return {
                id: productModel.id,
                name: productModel.name,
                price: productModel.price,
                // outros campos conforme sua interface/estrutura Product
            } as Product;
        });

        return productsList;

    }

    private toPersistenceObject(entity: Product): any {
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price
        };
    }

}