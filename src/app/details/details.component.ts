import { Component, inject, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: "app-details",
  imports: [LayoutComponent],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
  private productService = inject(ProductService);

  product?: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.product = this.productService.getProductById(id);
  }
}
