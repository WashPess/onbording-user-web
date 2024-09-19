import { Component, Input } from "@angular/core";


@Component ({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  @Input() title = ""; // bind
  @Input() content = "";
  @Input() link = ""; // link em texto

}