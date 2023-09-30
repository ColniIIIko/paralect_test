export interface Product {
  _id: string;
  title: string;
  price: number;
  imgURL: string;
  createdOn?: Date;
  createdBy: string;
}
