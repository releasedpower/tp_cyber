import { Injectable } from "@angular/core";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Product[] = [
    {
      id: 1,
      title: "J'Adore Eau de Parfum",
      image: "../../assets/images/dior.png",
      description:
        "J’adore Eau de Parfum is revealed in a bottle adorned with a reinvented collar. The emblematic J'adore amphora bottle is rediscovered through a new silhouette, more precious than ever. A true signature fragrance, J’adore Eau de Parfum is distinguished by its perfectly balanced floral bouquet in which no one note overshadows another, creating the sensation of a single, dreamlike flower.",
    },
    {
      id: 2,
      title: "Nina",
      image: "../../assets/images/nina.png",
      description:
        "Inspired by nature, Nina by Nina Ricci is a vegan fragrance as delightfully fresh and tantalizing as a toffee apple. It’s a modern citrus-floral scent, bursting with positivity and a touch of playfulness.",
    },
    {
      id: 3,
      title: "Coco Mademoiselle",
      image: "../../assets/images/coco.png",
      description:
        "Irresistibly sensual, irrepressibly spirited. A sparkling, bold ambery fragrance that recalls a daring young Coco Chanel. An absolutely modern composition with a strong yet surprisingly fresh character. A double name, a double personality. Independent and endearing, mischievous and provocative, light and exuberant. The expression of a woman free to reinvent herself day after day.",
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
