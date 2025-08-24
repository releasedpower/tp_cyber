import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  productImages = [
    '../../assets/images/dior.png',
    '../../assets/images/nina.png',
    '../../assets/images/coco.png',
  ];
  private apiUrl = "http://localhost:3000/products"; // adjust if needed
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { withCredentials: true }).pipe(
      map((products) =>
        products.map((p) => ({
          ...p,
          image: this.productImages[Math.floor(Math.random() * this.productImages.length)],
        }))
      )
    );
  }

  // fetch a single product by id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
