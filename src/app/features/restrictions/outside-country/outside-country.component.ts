import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-outside-country",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <img src="assets/img/icon-warning.svg" alt="" />
      <h1>No es posible iniciar el proceso</h1>
      <p>
        Puedes contactarte con nosotros desde <br />
        Bogotá al teléfono <strong>(601) 514 55 55</strong> o desde <br />
        cualquier otro lugar del país <br />
        al <strong>01 8000 930 955.</strong> <br />
      </p>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
      }
      p {
        color: rgba(0, 40, 80, 1);
        font-family: "Girloy-medium", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: 0%;
        text-align: center;
      }
      h1 {
        color: rgba(0, 40, 80, 1);
        font-family: "Gilroy-Bold", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: 0%;
      }
    `,
  ],
})
export class OutsideCountryComponent {}
