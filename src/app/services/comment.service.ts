// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments'; // adjust if needed

  constructor(private http: HttpClient) {}

  getCommentsByProduct(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/product/${productId}`, { withCredentials: true });
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment, { withCredentials: true });
  }
}
