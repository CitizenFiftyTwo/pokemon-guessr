import { Component, Input } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { Button } from "primeng/button";
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    TranslateModule,
    Button
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Input()
  numberOfRounds = 1;

  @Input()
  score = 0;

  constructor(private navigationService: NavigationService) {
  }


  protected getScoreLabel() {
    const percentage = this.score / this.numberOfRounds;

    if (percentage === 0) {
      return 'RESULT.SCORE_ZERO';
    }

    if (percentage === 1) {
      return 'RESULT.SCORE_PERFECT';
    }

    if (percentage < 0.5) {
      return 'RESULT.SCORE_BAD';
    }

    return 'RESULT.SCORE_OK';
  }

  protected playAgain() {
    this.navigationService.toSettings();
  }
}
