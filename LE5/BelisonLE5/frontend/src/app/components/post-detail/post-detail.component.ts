import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    });
  }

  initData(): void {
    this.http.get<Post>(`https://localhost:7080/api/post/${this.id}`)
      .subscribe({
        next: (data: Post) => {
          this.post = data;
          console.log('Post details:', this.post);
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}