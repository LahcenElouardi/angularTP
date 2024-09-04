import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  categoryId: number | null = null;

  constructor(
    public quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
      if (this.categoryId) {
        this.quizService.getQuizContent(this.categoryId);
      }
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}
