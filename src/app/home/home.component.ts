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
  private productService = inject(ProductService);
  products: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  details(id: number) {
    this.router.navigate(["/details", id]);
  }
}
