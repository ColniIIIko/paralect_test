export interface Product {
  _id: string;
  title: string;
  price: number;
  imgUrl: string;
  createdOn?: Date;
  createdBy: string;
}
