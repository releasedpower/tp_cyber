import { Component, inject, OnInit } from "@angular/core";
import { LayoutComponent } from "../layout/layout.component";
import { Router } from "@angular/router";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-home",
  imports: [LayoutComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  errorMessage = "";

  constructor(private productService: ProductService, private router:Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || "Failed to load products";
      },
    });
  }
    details(id: number) {
    this.router.navigate(["/details", id]);
  }
}
