import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-invalid-qr",
  standalone: true,
  imports: [CommonModule],
  template: `<section>
    <img src="assets/img/Icon-time.svg" alt="" />
    <h1>Este QR ya fue usado</h1>
    <p>
      Este código ya fue utilizado. Por razones de seguridad, los QR solo pueden <br />escanearse una vez.Puedes solicitar uno nuevo para
      continuar tu proceso.
    </p>
    <button class="btn-primary btn-custon">Entendido</button>
  </section> `,
  styles: [
    `
      h1 {
        font-family: "Gilroy-Bold", sans-serif;
        font-size: 32px;
        font-weight: 400;
        text-align: center;
        color: rgba(0, 40, 80, 1);
      }
      img {
        width: 124px;
        height: 124px;
      }
      p {
        font-family: "Gilroy-medium", sans-serif;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
        color: rgba(0, 40, 80, 1);
        padding-bottom: 120px;
      }
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1 0 auto;
        padding-top: 153px;
      }
    `,
  ],
})
export class InvalidQrComponent {}
