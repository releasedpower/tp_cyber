import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LayoutComponent } from '../layout/layout.component';
import { ProductService } from '../services/product.service';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product';
import { Comment } from '../models/comment';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [LayoutComponent, FormsModule,CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product?: Product;
  comments: any[] = [];
  // comments: Comment[] = [];
  newCommentText = '';
  errorMessage = '';
  currentUserId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private commentService: CommentService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (!id) {
        this.errorMessage = 'Invalid product ID';
        return;
      }

      // Get logged-in user ID
      const userResponse = await firstValueFrom(this.authService.getLoggedinUserId());
      this.currentUserId = userResponse.userId;

      // Fetch product details
      this.product = await firstValueFrom(this.productService.getProductById(id));

      // Fetch comments for the product SAFE
      // this.comments = await firstValueFrom(this.commentService.getCommentsByProduct(id));


      // unsafe
      const rawComments = await firstValueFrom(this.commentService.getCommentsByProduct(id));
      // Mark comment text as safe HTML (dangerous, only for TP!)
      this.comments = rawComments.map(c => ({
        ...c,
        comment: this.sanitizer.bypassSecurityTrustHtml(c.comment)
      }));

    } catch (error: any) {
      this.errorMessage = error.message || 'Error loading data';
    }
  }

  async postComment() {
    if (!this.newCommentText.trim()) {
      return;
    }

    if (!this.currentUserId || !this.product) {
      this.errorMessage = 'You must be logged in to comment';
      return;
    }

    const newComment: Comment = {
      idUser: this.currentUserId,
      idProduct: this.product.id,
      comment: this.newCommentText
    };

    try {
      // const createdComment = await firstValueFrom(this.commentService.postComment(newComment));

      // // Optionally, fetch comments again or just push the new one
      // this.comments.push(createdComment);
      // // Clear textarea
      // this.newCommentText = '';

      // UNSAFE
      const createdComment = await firstValueFrom(this.commentService.postComment(newComment));
      // Bypass sanitization for the new comment too
      this.comments.push({
        ...createdComment,
        comment: this.sanitizer.bypassSecurityTrustHtml(createdComment.comment)
      });
    } catch (error: any) {
      this.errorMessage = error.message || 'Error posting comment';
    }
  }
}
