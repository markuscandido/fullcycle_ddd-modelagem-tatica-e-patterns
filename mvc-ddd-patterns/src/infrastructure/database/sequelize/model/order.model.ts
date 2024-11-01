import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order_item.model";

@Table({
    tableName: "orders",
    timestamps: true
})
export default class OrderModel extends Model{
    
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;
}