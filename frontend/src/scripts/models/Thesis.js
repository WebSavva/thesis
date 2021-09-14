export default class Thesis {
  constructor() {
    this.documents = new Map();
    this.documents.set("thesis.pdf", "Текст ВКР");
    this.documents.set(
      "mentorReview.pdf",
      "Отзыв научного руководителя А.В.Юркова"
    );
    this.documents.set("employerReview.pdf", "Отзыв рецензента М.И.Мелешкина");
  }
}
