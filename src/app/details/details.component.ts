import { Component, inject, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { Comments } from "../models/comments";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  imports: [LayoutComponent, FormsModule],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
  private productService = inject(ProductService);

  product?: Product;
  comments: Comments[] = [
    {
      username: "Matt",
      comment: "good perfume",
    },
    {
      username: "Lauren",
      comment: "nice perfume",
    },
    {
      username: "Dave",
      comment: "cool perfume",
    },
  ];

  newCommentText = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.product = this.productService.getProductById(id);
  }

  postComment(): void {
    if (!this.newCommentText.trim()) return;

    this.comments.push({
      username: "Anonymous",
      comment: this.newCommentText.trim(),
    });
    this.newCommentText = "";
  }
}
