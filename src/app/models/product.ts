export class Product {
  AuctionID: string;
  Bids: string;
  Title: string;
  Price: string;
  TaxRate: string;
  Quantity: string;
  StartTime: string;
  EndTime: string;
  Initprice: string;
  Description: string;
  Bidorbuy: string;
  Status: string;
  Image: string;
  CurrentPrice: string;
  Seller = new Seller();
}

class Seller {
  Id: string;
}
